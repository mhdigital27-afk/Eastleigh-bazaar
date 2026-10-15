
ALTER TABLE public.admin_settings
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS mpesa_till text,
  ADD COLUMN IF NOT EXISTS mpesa_paybill text,
  ADD COLUMN IF NOT EXISTS bank_name text,
  ADD COLUMN IF NOT EXISTS bank_account_name text,
  ADD COLUMN IF NOT EXISTS bank_account_number text,
  ADD COLUMN IF NOT EXISTS contact_email text DEFAULT 'Eastleighbazaar6@gmail.com';

INSERT INTO public.admin_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

GRANT SELECT ON public.admin_settings TO anon;

DROP POLICY IF EXISTS "Admins read settings" ON public.admin_settings;
CREATE POLICY "Anyone can read settings" ON public.admin_settings
  FOR SELECT TO anon, authenticated USING (true);
