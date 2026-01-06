import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function listTables() {
  try {
    // Query the information_schema to get all tables
    const { data, error } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          ORDER BY table_name;
        `
      })

    if (error) {
      console.error('Error fetching tables:', error.message)

      // Alternative: Try to list known tables by attempting to query them
      console.log('\nAttempting to query known tables...\n')
      const knownTables = ['ingredients', 'recipes', 'users', 'profiles']

      for (const table of knownTables) {
        const { error: tableError } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })

        if (!tableError) {
          console.log(`✓ ${table} (exists)`)
        }
      }
      return
    }

    console.log('Tables in your Supabase database:\n')
    data.forEach(row => {
      console.log(`- ${row.table_name}`)
    })
  } catch (err) {
    console.error('Error:', err.message)
  }
}

listTables()
