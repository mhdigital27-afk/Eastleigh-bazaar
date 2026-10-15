
-- Enums
CREATE TYPE public.app_role AS ENUM ('merchant', 'super_admin');
CREATE TYPE public.business_sector AS ENUM ('retail', 'hotel', 'hospital', 'forex');
CREATE TYPE public.listing_status AS ENUM ('pending_review', 'live', 'hidden');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  phone_number text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by owner" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles updatable by owner" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles insertable by owner" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- USER ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- BUSINESS LISTINGS
CREATE TABLE public.business_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  sector public.business_sector NOT NULL,
  status public.listing_status NOT NULL DEFAULT 'pending_review',
  requires_admin_review boolean NOT NULL DEFAULT false,
  is_paid_forex boolean NOT NULL DEFAULT false,
  description text,
  address text,
  contact_phone text,
  contact_email text,
  logo_url text,
  -- retail
  trade_type text,
  mall_name text,
  stall_number text,
  -- hotel
  room_price_range text,
  hotel_amenities text[] DEFAULT '{}'::text[],
  -- hospital
  emergency_hotline text,
  operational_hours text,
  medical_services text,
  insurance_providers text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_business_sector ON public.business_listings(sector);
CREATE INDEX idx_business_status ON public.business_listings(status);
CREATE INDEX idx_business_owner ON public.business_listings(owner_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_listings TO authenticated;
GRANT SELECT ON public.business_listings TO anon;
GRANT ALL ON public.business_listings TO service_role;
ALTER TABLE public.business_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view live listings" ON public.business_listings
  FOR SELECT TO anon, authenticated USING (status = 'live');
CREATE POLICY "Owners can view own listings" ON public.business_listings
  FOR SELECT TO authenticated USING (auth.uid() = owner_id);
CREATE POLICY "Admins can view all listings" ON public.business_listings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Owners can insert their listings" ON public.business_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their listings" ON public.business_listings
  FOR UPDATE TO authenticated USING (auth.uid() = owner_id);
CREATE POLICY "Admins can update any listing" ON public.business_listings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins can delete any listing" ON public.business_listings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Owners can delete own listings" ON public.business_listings
  FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- CATALOG ITEMS
CREATE TABLE public.catalog_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.business_listings(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  price_rate text NOT NULL,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_catalog_business ON public.catalog_items(business_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.catalog_items TO authenticated;
GRANT SELECT ON public.catalog_items TO anon;
GRANT ALL ON public.catalog_items TO service_role;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view catalog of live businesses" ON public.catalog_items
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = business_id AND b.status = 'live')
  );
CREATE POLICY "Owners view own catalog" ON public.catalog_items
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = business_id AND b.owner_id = auth.uid())
  );
CREATE POLICY "Owners manage own catalog" ON public.catalog_items
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = business_id AND b.owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = business_id AND b.owner_id = auth.uid())
  );
CREATE POLICY "Admins manage all catalog" ON public.catalog_items
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- AD SLOTS
CREATE TABLE public.ad_slots (
  id integer PRIMARY KEY CHECK (id BETWEEN 1 AND 5),
  image_url text,
  target_business_id uuid REFERENCES public.business_listings(id) ON DELETE SET NULL,
  caption text,
  is_active boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ad_slots TO anon, authenticated;
GRANT ALL ON public.ad_slots TO service_role;
GRANT UPDATE ON public.ad_slots TO authenticated;
ALTER TABLE public.ad_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read ad slots" ON public.ad_slots
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can update ad slots" ON public.ad_slots
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

INSERT INTO public.ad_slots (id, is_active) VALUES (1,false),(2,false),(3,false),(4,false),(5,false);

-- FOREX RATES
CREATE TABLE public.forex_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bureau_id uuid NOT NULL REFERENCES public.business_listings(id) ON DELETE CASCADE,
  currency text NOT NULL CHECK (currency IN ('USD','GBP','EUR','SAR','AED')),
  buy_rate numeric(12,4) NOT NULL,
  sell_rate numeric(12,4) NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bureau_id, currency)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forex_rates TO authenticated;
GRANT SELECT ON public.forex_rates TO anon;
GRANT ALL ON public.forex_rates TO service_role;
ALTER TABLE public.forex_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view rates for live paid forex" ON public.forex_rates
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.business_listings b
      WHERE b.id = bureau_id AND b.status = 'live' AND b.is_paid_forex = true AND b.sector = 'forex')
  );
CREATE POLICY "Owners manage own rates" ON public.forex_rates
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = bureau_id AND b.owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.business_listings b WHERE b.id = bureau_id AND b.owner_id = auth.uid())
  );
CREATE POLICY "Admins view all rates" ON public.forex_rates
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- ADMIN SETTINGS
CREATE TABLE public.admin_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  admin_display_name text DEFAULT 'Eastleigh Bazaar Admin',
  admin_contact text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;
GRANT UPDATE ON public.admin_settings TO authenticated;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read settings" ON public.admin_settings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins update settings" ON public.admin_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
INSERT INTO public.admin_settings (id) VALUES (1);

-- Auto profile + updated_at
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'merchant') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_business_updated BEFORE UPDATE ON public.business_listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_forex_updated BEFORE UPDATE ON public.forex_rates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- When live listing edits critical fields, flag for review
CREATE OR REPLACE FUNCTION public.flag_listing_for_review()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.status = 'live' AND (
    NEW.name IS DISTINCT FROM OLD.name OR
    NEW.description IS DISTINCT FROM OLD.description OR
    NEW.address IS DISTINCT FROM OLD.address OR
    NEW.contact_phone IS DISTINCT FROM OLD.contact_phone OR
    NEW.sector IS DISTINCT FROM OLD.sector
  ) THEN
    NEW.requires_admin_review = true;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER trg_flag_review BEFORE UPDATE ON public.business_listings
  FOR EACH ROW EXECUTE FUNCTION public.flag_listing_for_review();
