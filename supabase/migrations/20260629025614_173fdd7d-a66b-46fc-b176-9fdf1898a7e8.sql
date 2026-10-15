
CREATE POLICY "Anon manage ad banners" ON storage.objects
  FOR ALL TO anon
  USING (bucket_id = 'ad-banners')
  WITH CHECK (bucket_id = 'ad-banners');

CREATE POLICY "Auth manage ad banners" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'ad-banners')
  WITH CHECK (bucket_id = 'ad-banners');
