import { supabase } from './supabase';

export type Post = {
  id: string;
  title: string;
  image_url: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
};

// ==========================================
// MOCK DATA IMPLEMENTATION
// ==========================================

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Sustainable Home Building',
    image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80',
    content: '<p>Sustainable home building is no longer just a trend; it is the standard. At GriyaReka, we incorporate eco-friendly materials and energy-efficient designs to create homes that are not only beautiful but also kind to the environment.</p><p>Our latest projects feature solar panel integrations, smart climate control, and recycled building materials.</p>',
    author_id: 'admin-1',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Minimalist Design for Modern Families',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    content: '<p>Minimalism is about focusing on what matters. Our custom designs for modern families prioritize open spaces, natural light, and functional aesthetics.</p><p>Discover how removing clutter can completely transform your daily living experience.</p>',
    author_id: 'admin-1',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '3',
    title: 'Integrating Smart Tech seamlessly',
    image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80',
    content: '<p>Smart homes are becoming smarter. At GriyaReka, we integrate smart home technology seamlessly during the construction phase, ensuring a clean look without visible wires.</p><ul><li>Automated Lighting</li><li>Voice-controlled Security</li><li>Smart HVAC Systems</li></ul>',
    author_id: 'admin-1',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  }
];

export async function getPosts(): Promise<Post[]> {
  // MOCK IMPLEMENTATION
  return Promise.resolve(MOCK_POSTS);
}

export async function getPostById(id: string): Promise<Post | null> {
  // MOCK IMPLEMENTATION
  const post = MOCK_POSTS.find(p => p.id === id);
  return Promise.resolve(post || null);
}

// ==========================================
// SUPABASE ACTUAL IMPLEMENTATION (TEMPLATE)
// ==========================================
/*
export async function getPostsSupabase(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data as Post[];
}

export async function getPostByIdSupabase(id: string): Promise<Post | null> {
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

export async function createPostSupabase(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
    
  if (error) throw error;
  return data;
}

export async function updatePostSupabase(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
}

export async function deletePostSupabase(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
}
*/
