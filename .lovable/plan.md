# Eastleigh Bazaar — Build Plan

A mobile-first directory for Eastleigh businesses (Retail, Hotels, Hospitals, Forex) with merchant self-onboarding, admin moderation, a rotating ad banner, a live forex ticker, and a price-over-photo catalog gallery.

## 1. Backend (Lovable Cloud / Supabase)

Enable Lovable Cloud, then run one migration creating:

- `profiles` — id (uuid, FK auth.users), email, display_name, phone_number, role text default `'merchant'`
- `business_listings` — owner_id, name, sector, status default `'pending_review'`, requires_admin_review bool, is_paid_forex bool, plus sector-specific cols (trade_type, mall_name, stall_number, room_price_range, hotel_amenities text[], emergency_hotline, operational_hours, medical_services, insurance_providers, contact phone, description, logo_url, address)
- `catalog_items` — business_id (cascade), item_name, price_rate, image_url
- `ad_slots` — id int 1..5, image_url, target_business_id, is_active bool, seeded with 5 rows
- `forex_rates` — bureau_id, currency (USD/GBP/EUR/SAR/AED), buy_rate numeric, sell_rate numeric, updated_at
- `admin_settings` — singleton row for admin display name/contact

Security:
- `user_roles` table + `app_role` enum (`merchant`, `super_admin`) + `has_role()` SECURITY DEFINER function (never store role on profiles for auth checks).
- RLS on every table with explicit GRANTs. Public SELECT only for `live` listings, active ad slots, catalog items of live businesses, and forex rates where bureau is live AND is_paid_forex.
- Trigger to auto-create profile row on `auth.users` insert.
- Storage buckets (public): `catalog-images`, `ad-banners`, `business-logos` with owner-scoped write policies.

## 2. Design System (Gulf Blue)

`src/styles.css` tokens:
- `--background` #FFFFFF, `--surface` #F8FAFC
- `--primary` Gulf Blue #051435, `--primary-deep` #0B1E43
- `--accent` Amber Gold #FFAA00, `--accent-soft` #E5A93B
- Inter (loaded via `<link>` in `__root.tsx`), semantic tokens mapped via `@theme inline`
- Reusable utility classes for price badge, glow border, marquee pause-on-hover

## 3. Routes (TanStack file-based)

Public:
- `/` Homepage: 5-slot rotating ad banner → vertical forex ticker → search bar → 4 hub cards (Retail/Hotels/Hospitals/Forex)
- `/category/$sector` Filtered directory grid + search
- `/business/$id` Public profile with catalog gallery (price-over-photo overlay) and sector-specific details; forex bureaus show full rate table
- `/search` Results page
- `/auth` Merchant Sign Up / Log In dual-tab
- `/super-admin` Login gate with hardcoded bypass

Authenticated (`_authenticated/`):
- `/merchant` Dashboard shell with tabs: Profile & Security, Business Listing (dynamic by sector), Manage Catalog Gallery, Forex Rates (with paywall overlay if `is_paid_forex=false`)

Super-admin (gated by `/super-admin` bypass state in sessionStorage + role check):
- `/super-admin/dashboard` with 4 tabs: Admin Settings, Ad Management (5 slot rows with uploader), Pending Approvals, All Directory Listings (filter, live/hide toggle, edit modal, hard delete with cascading storage purge)

## 4. Key Modules

- **Rotating Ad Banner**: auto-rotate every 5s, placeholder text when slot inactive, click routes to `target_business_id`.
- **Vertical Forex Ticker**: CSS keyframe upward marquee, `:hover`/`:active` pause, fetches live+paid forex bureaus with their 5 currency rates, row click → bureau profile.
- **Catalog Gallery**: Responsive grid; each tile has top-right Gulf Blue/Amber Gold price badge and bottom semi-transparent black item-name banner; merchant uploads via Supabase Storage.
- **Dynamic Onboarding Form**: Single form whose fields swap on sector select; edits on a live listing keep it live but flip `requires_admin_review=true`.
- **Forex Paywall**: Overlay on rate-input tab when `is_paid_forex=false`; admin toggle in directory explorer flips it live instantly.

## 5. Implementation Order

1. Enable Lovable Cloud, run schema migration, seed 5 ad_slots.
2. Design tokens + Inter font + root layout with header (logo + slogan + auth buttons).
3. Auth pages and `_authenticated` gate (managed layout).
4. Homepage (ad banner + ticker + search + hub cards).
5. Category listing + public business profile + catalog gallery overlay.
6. Merchant dashboard (profile, dynamic listing form, catalog manager, forex rates + paywall).
7. `/super-admin` gate with hardcoded bypass + 4 admin tabs.
8. Polish: mobile spacing, SEO meta per route, empty states.

## Technical Notes

- Hardcoded master credentials at `/super-admin` are stored in client code per your spec; this is a known security trade-off (anyone reading the JS bundle can see them). I'll keep DB-level RLS strict and gate sensitive writes through `has_role('super_admin')` server-side so the bypass only unlocks UI for the seeded admin row — recommend later moving to real auth.
- Forex rates input uses an editable grid (one row per currency) writing to `forex_rates`.
- Hard delete uses a Postgres function (SECURITY DEFINER, admin-only) that cascades rows; storage objects are deleted from the client after the row delete succeeds.
- All data fetching uses TanStack Query with the router's QueryClient.

Ready to build on approval.