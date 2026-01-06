-- Migration to add image storage for ingredients
-- Run this in your Supabase SQL Editor

-- Step 1: Add image_url column to ingredients table
ALTER TABLE ingredients
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN ingredients.image_url IS 'URL to ingredient image stored in Supabase Storage';

-- Step 2: Create storage bucket for ingredient images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ingredient-images',
  'ingredient-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Create storage policies for ingredient images

-- Allow authenticated users to upload
CREATE POLICY "Users can upload ingredient images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ingredient-images');

-- Allow public read access
CREATE POLICY "Public can view ingredient images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ingredient-images');

-- Allow users to update their images
CREATE POLICY "Users can update their ingredient images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ingredient-images');

-- Allow users to delete their images
CREATE POLICY "Users can delete their ingredient images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ingredient-images');
