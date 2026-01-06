-- Create saved_recipes table
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Spoonacular recipe ID (for deduplication and reference)
  recipe_id INTEGER NOT NULL,

  -- Full recipe data (stored as JSONB for flexibility)
  recipe_data JSONB NOT NULL,

  -- Extracted fields for quick access/filtering
  title TEXT NOT NULL,
  image_url TEXT,
  ready_in_minutes INTEGER,
  servings INTEGER,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one recipe per user
  CONSTRAINT unique_user_recipe UNIQUE(user_id, recipe_id)
);

-- Create indexes for user queries
CREATE INDEX idx_saved_recipes_user_id ON saved_recipes(user_id);
CREATE INDEX idx_saved_recipes_created_at ON saved_recipes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own saved recipes"
  ON saved_recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved recipes"
  ON saved_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved recipes"
  ON saved_recipes FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved recipes"
  ON saved_recipes FOR UPDATE
  USING (auth.uid() = user_id);
