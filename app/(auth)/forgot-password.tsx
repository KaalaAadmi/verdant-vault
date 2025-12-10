import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert } from "react-native";
import { Input } from "@/components/bna/Input";
import { Button } from "@/components/bna/Button";
import { useSignIn } from "@clerk/clerk-expo";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function ForgotPasswordScreen() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onReset = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signIn.create({ identifier: email });
      await signIn.prepareFirstFactor({ strategy: "email_code" });
      Alert.alert("Reset email sent", "Please check your inbox.");
    } catch (e: any) {
      Alert.alert(
        "Request failed",
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
          Reset your password
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
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ height: 16 }} />
          <Button
            title={loading ? "Sending..." : "Send Reset Email"}
            onPress={onReset}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
