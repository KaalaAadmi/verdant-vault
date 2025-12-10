import { Button } from "@/components/bna/Button";
import { Input } from "@/components/bna/Input";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function PhoneEnterScreen() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const onSendCode = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({ phoneNumber: phone });
      await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
      router.push({
        pathname: "/(auth)/phone-verify",
        params: { phone },
      } as any);
    } catch (e: any) {
      Alert.alert(
        "Failed to send code",
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
          Verify your phone
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
          <Input
            label="Phone number"
            placeholder="+1 555 123 4567"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={{ height: 16 }} />
          <Button
            title={loading ? "Sending..." : "Send verification code"}
            onPress={onSendCode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
