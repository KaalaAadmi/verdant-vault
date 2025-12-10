import { Button } from "@/components/bna/Button";
import { InputOTP } from "@/components/bna/InputOTP";
import { syncUserToBackend } from "@/lib/user-sync";
import { useSignUp } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function VerifyEmailScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: res.createdSessionId });
      const user = res?.createdUserId
        ? {
            id: res.createdUserId,
            email: signUp?.emailAddress || "",
            name: (signUp as any)?.unsafeMetadata?.name || "",
            imageUrl: null,
            emailVerified: true,
          }
        : {
            id: "",
            email: signUp?.emailAddress || "",
            name: "",
            imageUrl: null,
            emailVerified: true,
          };
      await syncUserToBackend(user);
      Alert.alert("Email verified", "Your account is ready.");
    } catch (e: any) {
      console.log("Error during email verification:", e);
      Alert.alert(
        "Verification failed",
        e?.errors?.[0]?.message || e?.message || "Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: accent,
            marginBottom: 12,
          }}
        >
          Verify your email
        </Text>
        <View
          style={{
            borderRadius: 16,
            backgroundColor: background,
            borderWidth: 1,
            borderColor: "#e9efea",
            padding: 16,
          }}
        >
          <Text style={{ color: accent, marginBottom: 8 }}>
            Enter the 6-digit code sent to your email
          </Text>
          <InputOTP
            length={6}
            value={code}
            onChange={setCode}
            accentColor={accent}
          />
          <View style={{ height: 16 }} />
          <Button
            title={loading ? "Verifying..." : "Verify"}
            onPress={onVerify}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
