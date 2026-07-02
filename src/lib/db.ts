import { supabase, isSupabaseConfigured } from './supabase';
import { supabaseAdmin } from './supabase-admin';
import { logActivityClient } from './activity';

export type Post = {
  id: string;
  title: string;
  image_url: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  slug?: string;
  status?: string;
  profiles?: { display_name: string };
};

export type Property = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image_url: string;
  created_at: string;
};

export type AdminActivity = {
  id: string;
  user_id: string;
  action_type: 'created' | 'updated' | 'deleted';
  entity_type: 'post' | 'property' | 'testimonial' | 'user';
  entity_id: string;
  entity_title: string;
  entity_slug: string | null;
  created_at: string;
  profiles?: { display_name: string };
};

// ==========================================
// SUPABASE ADMIN ACTIVITIES
// ==========================================

export async function getPaginatedActivities(page: number, limit: number): Promise<{ data: AdminActivity[], count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('admin_activities')
    .select('*, profiles(display_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching activities:', error?.message || error);
    return { data: [], count: 0 };
  }
  return { data: data as AdminActivity[], count: count || 0 };
}

// ==========================================
// SUPABASE POSTS
// ==========================================

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(display_name)')
    .order('created_at', { ascending: false });

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching posts:', error?.message || error);
    return [];
  }
  return data as Post[];
}

export async function getDashboardStats() {
  const [
    { count: postsCount },
    { count: activitiesCount },
    { count: testimonialsCount },
    { count: usersCount }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('admin_activities').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true })
  ]);
  
  return {
    posts: postsCount || 0,
    activities: activitiesCount || 0,
    testimonials: testimonialsCount || 0,
    users: usersCount || 0
  };
}

export async function getAuthors(): Promise<{ id: string, display_name: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('id, display_name')
    .order('display_name', { ascending: true });
    
  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching authors:', error?.message || error);
    return [];
  }
  return data as { id: string, display_name: string }[];
}

export async function getPaginatedPosts(page: number, limit: number, authorId?: string, sortBy: string = 'newest'): Promise<{ data: Post[], count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('posts')
    .select('*, profiles(display_name)', { count: 'exact' });

  if (authorId && authorId !== 'all') {
    query = query.eq('author_id', authorId);
  }

  if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching paginated posts:', error?.message || error);
    return { data: [], count: 0 };
  }
  return { data: data as Post[], count: count || 0 };
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(display_name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  return data as Post;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
    
  if (error) throw error;
  return data;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  
  if (data) {
    await logActivityClient('updated', 'post', data.id, data.title, data.slug);
  }
  
  return data;
}

export async function deletePost(id: string) {
  // Fetch post first to get title and slug for the log
  const { data: postToDel } = await supabase.from('posts').select('title, slug').eq('id', id).single();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  
  if (postToDel) {
    await logActivityClient('deleted', 'post', id, postToDel.title, postToDel.slug);
  }
  
  return true;
}

// ==========================================
// SUPABASE PROPERTIES
// ==========================================

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching properties:', error?.message || error);
    return [];
  }
  return data as Property[];
}

export async function getPaginatedProperties(page: number, limit: number): Promise<{ data: Property[], count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching paginated properties:', error?.message || error);
    return { data: [], count: 0 };
  }
  return { data: data as Property[], count: count || 0 };
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
  return data as Property;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }
  return data as Property;
}

export async function createProperty(property: Omit<Property, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('properties')
    .insert([property])
    .select();
    
  if (error) throw error;
  return data;
}

export async function updateProperty(id: string, updates: Partial<Property>) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
}

export async function deleteProperty(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
}

// ==========================================
// SUPABASE TESTIMONIALS
// ==========================================

export type Testimonial = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  content: string;
  is_published: boolean;
  is_subscribed: boolean;
  created_at: string;
};

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching published testimonials:', error?.message || error);
    return [];
  }
  return data as Testimonial[];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching all testimonials:', error?.message || error);
    return [];
  }
  return data as Testimonial[];
}

export async function getPaginatedTestimonials(page: number, limit: number): Promise<{ data: Testimonial[], count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching paginated testimonials:', error?.message || error);
    return { data: [], count: 0 };
  }
  return { data: data as Testimonial[], count: count || 0 };
}

export async function updateTestimonialStatus(id: string, is_published: boolean) {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ is_published })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
}
