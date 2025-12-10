import { Button } from "@/components/bna/Button";
import { Input } from "@/components/bna/Input";
import { Link } from "@/components/bna/Link";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn } from "@clerk/clerk-expo";
import { syncUserToBackend } from "@/lib/user-sync";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function LoginScreen() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signIn.create({ identifier: email, password });
      await setActive({ session: res.createdSessionId });
      const clerkUser = res?.createdUserId
        ? {
            id: res.createdUserId,
            email,
            name: null,
            imageUrl: null,
            emailVerified: true,
          }
        : {
            id: "",
            email,
            name: null,
            imageUrl: null,
            emailVerified: true,
          };
      await syncUserToBackend(clerkUser);
      router.replace("/(tabs)" as any);
    } catch (e: any) {
      Alert.alert(
        "Login failed",
        e?.errors?.[0]?.message || e?.message || "Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: background,
        height: "100%",
        justifyContent: "center",
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
          Welcome back
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
          <View style={{ height: 12 }} />
          <Input
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ height: 16 }} />
          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={onLogin}
          />
          <View style={{ height: 12 }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Link onPress={() => router.push("/(auth)/forgot-password" as any)}>
              Forgot password?
            </Link>
            <Link onPress={() => router.push("/(auth)/register" as any)}>
              Create account
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
