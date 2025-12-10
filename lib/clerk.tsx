import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

const tokenCache = {
  async getToken(key: string) { try { return await SecureStore.getItemAsync(key); } catch { return null; } },
  async saveToken(key: string, value: string) { try { await SecureStore.setItemAsync(key, value); } catch {} },
};

export function withClerkProvider(children: React.ReactNode) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
