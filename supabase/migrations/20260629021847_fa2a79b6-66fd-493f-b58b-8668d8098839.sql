
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.flag_listing_for_review()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
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

-- Restrict SECURITY DEFINER funcs
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- authenticated needs has_role for RLS checks (called inside policies as definer, but allow direct too)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
