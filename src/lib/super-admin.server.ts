const MASTER_EMAIL = "Eastleighbazaar6@gmail.com";
const MASTER_PASSWORD = "next 2758";

type AdminTokenPayload = {
  email: string;
  exp: number;
};

function getSigningSecret() {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Admin signing is not configured");
  return secret;
}

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return atob(padded);
}

async function sign(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function issueSuperAdminToken(email: string, password: string) {
  if (email.trim().toLowerCase() !== MASTER_EMAIL.toLowerCase() || password !== MASTER_PASSWORD) {
    throw new Error("Invalid credentials");
  }

  const payload: AdminTokenPayload = {
    email: MASTER_EMAIL,
    exp: Date.now() + 8 * 60 * 60 * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function assertSuperAdminToken(token: string) {
  const [encodedPayload, receivedSignature] = token.split(".");
  if (!encodedPayload || !receivedSignature) throw new Error("Admin session expired. Please unlock again.");

  const expectedSignature = await sign(encodedPayload);
  if (!safeEqual(receivedSignature, expectedSignature)) {
    throw new Error("Admin session expired. Please unlock again.");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminTokenPayload;
  if (payload.email !== MASTER_EMAIL || payload.exp < Date.now()) {
    throw new Error("Admin session expired. Please unlock again.");
  }
}