import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '..', '.env')
const envFile = readFileSync(envPath, 'utf-8')

const envVars = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runMigration() {
  try {
    console.log('Running migration to add calories and contents columns...\n')

    // First, check the current structure of ingredients table
    const { data: existingData, error: selectError } = await supabase
      .from('ingredients')
      .select('*')
      .limit(1)

    if (selectError) {
      console.error('Error checking existing table:', selectError.message)
      return
    }

    console.log('Current ingredients table columns:', Object.keys(existingData[0] || {}))

    // Check if columns already exist
    if (existingData.length > 0) {
      const hasCalories = 'calories' in existingData[0]
      const hasContents = 'contents' in existingData[0]

      if (hasCalories && hasContents) {
        console.log('\n✓ Columns already exist! No migration needed.')
        return
      }
    }

    console.log('\n⚠️  Migration needs to be run in Supabase Dashboard')
    console.log('\nThe anon key does not have permission to alter tables.')
    console.log('Please run this SQL in your Supabase Dashboard SQL Editor:\n')
    console.log('----------------------------------------')
    console.log('ALTER TABLE ingredients')
    console.log('ADD COLUMN IF NOT EXISTS calories INTEGER,')
    console.log('ADD COLUMN IF NOT EXISTS contents TEXT[];')
    console.log('')
    console.log("COMMENT ON COLUMN ingredients.calories IS 'Calorie content per unit/serving';")
    console.log("COMMENT ON COLUMN ingredients.contents IS 'Array of ingredient components';")
    console.log('----------------------------------------\n')

  } catch (err) {
    console.error('Error:', err.message)
  }
}

runMigration()
