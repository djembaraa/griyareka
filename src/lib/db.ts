import { supabase, isSupabaseConfigured } from './supabase';

export type Post = {
  id: string;
  title: string;
  image_url: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
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

// ==========================================
// SUPABASE POSTS
// ==========================================

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    if (isSupabaseConfigured) console.error('Error fetching posts:', error?.message || error);
    return [];
  }
  return data as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
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
    .select();
    
  if (error) throw error;
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
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
  content: string;
  is_published: boolean;
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
