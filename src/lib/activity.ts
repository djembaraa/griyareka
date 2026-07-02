import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';

export type ActionType = 'created' | 'updated' | 'deleted';
export type EntityType = 'post' | 'property' | 'testimonial' | 'user';

// For Client Components & Client API
export async function logActivityClient(
  action_type: ActionType,
  entity_type: EntityType,
  entity_id: string,
  entity_title: string,
  entity_slug?: string
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('admin_activities').insert({
      user_id: user.id,
      action_type,
      entity_type,
      entity_id,
      entity_title,
      entity_slug: entity_slug || null,
    });
    if (error) {
      console.error('Failed to log admin activity (client):', error);
    }
  } catch (err) {
    console.error('Exception in logActivityClient:', err);
  }
}

// For Server Actions (uses Admin to bypass session requirements)
export async function logActivityServer(
  user_id: string,
  action_type: ActionType,
  entity_type: EntityType,
  entity_id: string,
  entity_title: string,
  entity_slug?: string
) {
  try {
    const { error } = await supabaseAdmin.from('admin_activities').insert({
      user_id,
      action_type,
      entity_type,
      entity_id,
      entity_title,
      entity_slug: entity_slug || null,
    });
    if (error) {
      console.error('Failed to log admin activity (server):', error);
    }
  } catch (err) {
    console.error('Exception in logActivityServer:', err);
  }
}
