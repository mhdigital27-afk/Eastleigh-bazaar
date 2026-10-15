import { supabase } from "@/integrations/supabase/client";

// Generate a long-lived signed URL for a private bucket object path
export async function signedUrl(bucket: string, path: string, expiresIn = 60 * 60 * 24 * 365): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}

export async function uploadAndSign(bucket: string, path: string, file: File): Promise<string> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const url = await signedUrl(bucket, path);
  if (!url) throw new Error("Failed to create signed URL");
  return url;
}

export function extractStoragePath(url: string, bucket: string): string | null {
  // signed URL format: .../storage/v1/object/sign/<bucket>/<path>?token=...
  const m = url.match(new RegExp(`/object/(?:sign|public)/${bucket}/([^?]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}
