import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";

export const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <ClerkProvider publishableKey={clerkPublishableKey}>{children}</ClerkProvider>;
}
