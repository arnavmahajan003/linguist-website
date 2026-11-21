import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export interface Enquiry {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  course: string;
  message: string | null;
  consent: boolean;
  status?: string;
}

// Sends an enquiry. When Supabase is not configured yet (local preview),
// the enquiry is kept in localStorage so the flow can be tested end-to-end.
export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('enquiries').insert(enquiry);
    if (error) throw error;
    return;
  }
  const key = 'linguist_demo_enquiries';
  const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as Enquiry[];
  existing.push({ ...enquiry, created_at: new Date().toISOString(), status: 'new' });
  localStorage.setItem(key, JSON.stringify(existing));
}
