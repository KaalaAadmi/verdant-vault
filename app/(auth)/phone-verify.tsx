import { Button } from "@/components/bna/Button";
import { InputOTP } from "@/components/bna/InputOTP";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUp } from "@clerk/clerk-expo";
import { syncUserToBackend } from "@/lib/user-sync";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function PhoneVerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signUp.attemptPhoneNumberVerification({ code });
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
      await syncUserToBackend(user, {
        phone: String(phone || ""),
        phoneVerified: true,
      });
      Alert.alert("Phone verified", "Verification successful.");
    } catch (e: any) {
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
          Enter verification code
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
            Code sent to {phone}
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
            color={accent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
