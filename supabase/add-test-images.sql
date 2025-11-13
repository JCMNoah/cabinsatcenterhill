-- Add test images to the "Lakeside Retreat" cabin to showcase the gallery layout
-- These are free-to-use images from Unsplash

UPDATE public.cabins 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
  'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80'
],
updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440101';

-- Verify the update
SELECT id, title, array_length(images, 1) as image_count, images 
FROM public.cabins 
WHERE id = '550e8400-e29b-41d4-a716-446655440101';

