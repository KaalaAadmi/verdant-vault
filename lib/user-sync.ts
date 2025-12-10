import { endpoints } from "@/config/api";

type BaseUser = {
  id: string;
  name?: string | null;
  email: string;
  imageUrl?: string | null;
  emailVerified?: boolean;
};

type Overrides = Partial<{
  phone: string;
  phoneVerified: boolean;
  avatarUrl: string;
  loyaltyTier: string;
  preferences: Record<string, unknown>;
  authProvider: string;
}>;

// Create or update the user in your backend after verification/login
export async function syncUserToBackend(user: BaseUser, overrides: Overrides = {}) {
  if (!user?.email) return;

  const payload = {
    name: user.name || "",
    email: user.email,
    emailVerified: !!user.emailVerified,
    phone: overrides.phone ?? "",
    phoneVerified: overrides.phoneVerified ?? false,
    avatarUrl: overrides.avatarUrl ?? user.imageUrl ?? "",
    auth: { provider: overrides.authProvider ?? "clerk", providerId: user.id },
    loyaltyTier: overrides.loyaltyTier ?? "Bronze",
    preferences: overrides.preferences ?? {},
  };

  const res = await fetch(`${endpoints.profile.update}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Backend sync failed: ${res.status}`);
}
