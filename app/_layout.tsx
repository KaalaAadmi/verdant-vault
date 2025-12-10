import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { withClerkProvider } from "../lib/clerk";
import { useAuth } from "@clerk/clerk-expo";

function LayoutInner() {
  const router = useRouter();
  const segments = useSegments();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const inAuth = segments[0] === "(auth)";
    if (!isLoaded) return;
    if (!isSignedIn) {
      if (!inAuth) router.replace("/(auth)/login" as any);
    } else {
      if (inAuth) router.replace("/(tabs)" as any);
    }
  }, [segments, isSignedIn, isLoaded, router]);

  return <Slot />;
}

export default function RootLayout() {
  return withClerkProvider(<LayoutInner />);
}
