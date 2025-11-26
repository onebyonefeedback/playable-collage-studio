-- Create role enum and user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Update portfolio_items RLS policies to require admin role
DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON public.portfolio_items;

CREATE POLICY "Admin users can insert portfolio items"
ON public.portfolio_items
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can update portfolio items"
ON public.portfolio_items
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can delete portfolio items"
ON public.portfolio_items
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for playables
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'playables',
  'playables',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime', 'text/html', 'application/octet-stream']
);

-- Storage RLS policies for playables bucket
CREATE POLICY "Public can view playables"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'playables');

CREATE POLICY "Admin users can upload playables"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'playables' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin users can update playables"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'playables' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin users can delete playables"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'playables' 
  AND public.has_role(auth.uid(), 'admin')
);