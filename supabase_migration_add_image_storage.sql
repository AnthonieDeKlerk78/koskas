-- Migration to add image storage for ingredients
-- Run this in your Supabase SQL Editor

-- Step 1: Add image_url column to ingredients table
ALTER TABLE ingredients
ADD COLUMN image_url TEXT;

COMMENT ON COLUMN ingredients.image_url IS 'URL to ingredient image stored in Supabase Storage';

-- Step 2: Create storage bucket for ingredient images
-- Note: This needs to be done via Supabase Dashboard > Storage or via SQL
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ingredient-images',
  'ingredient-images',
  true, -- public bucket so images are accessible
  5242880, -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Create storage policy to allow authenticated users to upload
CREATE POLICY "Users can upload ingredient images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ingredient-images');

-- Step 4: Create storage policy to allow public read access
CREATE POLICY "Public can view ingredient images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ingredient-images');

-- Step 5: Create storage policy to allow users to update their own images
CREATE POLICY "Users can update their ingredient images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ingredient-images');

-- Step 6: Create storage policy to allow users to delete their own images
CREATE POLICY "Users can delete their ingredient images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ingredient-images');
