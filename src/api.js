import { createClient } from '@supabase/supabase-js'

const viteEnv = typeof import.meta !== 'undefined' ? import.meta.env ?? {} : {}
const nodeEnv = typeof process !== 'undefined' ? process.env ?? {} : {}

const supabaseUrl = viteEnv.VITE_SUPABASE_URL ?? nodeEnv.VITE_SUPABASE_URL
const supabaseAnonKey = viteEnv.VITE_SUPABASE_ANON_KEY ?? nodeEnv.VITE_SUPABASE_ANON_KEY

const configErrorMessage =
  'Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

const TABLE_NAME = 'names'

function getSupabase() {
  if (!supabase) {
    throw new Error(configErrorMessage)
  }
  return supabase
}

export async function getNames() {
  const { data, error } = await getSupabase()
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createName(name, extraFields = {}) {
  const payload = { name, ...extraFields }
  const { data, error } = await getSupabase()
    .from(TABLE_NAME)
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateName(id, updates) {
  const { data, error } = await getSupabase()
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteName(id) {
  const { error } = await getSupabase().from(TABLE_NAME).delete().eq('id', id)
  if (error) throw error
}
