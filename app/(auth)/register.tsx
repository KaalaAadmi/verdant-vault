import { Button } from "@/components/bna/Button";
import { Input } from "@/components/bna/Input";
import { Link } from "@/components/bna/Link";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUp } from "@clerk/clerk-expo";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function RegisterScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.update({ unsafeMetadata: { name } });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.replace("/(auth)/verify-email" as any);
    } catch (e: any) {
      console.log("Error during registration:", e);
      Alert.alert("Registration failed", e?.errors?.[0]?.message || e?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: background,
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: accent,
            marginBottom: 12,
          }}
        >
          Create your account
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
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />
          <View style={{ height: 12 }} />
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ height: 12 }} />
          <Input
            label="Password"
            placeholder="Choose a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ height: 16 }} />
          <Button
            title={loading ? "Registering..." : "Register"}
            onPress={onRegister}
            color={accent}
          />
          <View style={{ height: 12 }} />
          <Link
            onPress={() => router.push("/(auth)/login" as any)}
            color={accent}
          >
            Already have an account? Sign in
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
