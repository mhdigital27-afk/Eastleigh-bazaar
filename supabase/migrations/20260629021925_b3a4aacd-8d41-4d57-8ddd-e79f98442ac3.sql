
-- Public read for these buckets
CREATE POLICY "Public read catalog/ad/logos" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('catalog-images','ad-banners','business-logos'));

-- Authenticated users can upload into their own folder (first path segment = user id)
CREATE POLICY "Users upload own folder" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('catalog-images','business-logos')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users update own files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('catalog-images','business-logos')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users delete own files" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id IN ('catalog-images','business-logos')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Admins manage ad banners + everything
CREATE POLICY "Admins manage ad banners" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'ad-banners' AND public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (bucket_id = 'ad-banners' AND public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins manage all images" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id IN ('catalog-images','business-logos','ad-banners')
    AND public.has_role(auth.uid(), 'super_admin')
  )
  WITH CHECK (
    bucket_id IN ('catalog-images','business-logos','ad-banners')
    AND public.has_role(auth.uid(), 'super_admin')
  );
