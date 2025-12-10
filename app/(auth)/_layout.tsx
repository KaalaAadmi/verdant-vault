import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: "#1f6736",
        contentStyle: { backgroundColor: "#f7fcf9" },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Sign in" }} />
      <Stack.Screen name="register" options={{ title: "Create account" }} />
      <Stack.Screen name="verify-email" options={{ title: "Verify email" }} />
      <Stack.Screen name="phone-enter" options={{ title: "Verify phone" }} />
      <Stack.Screen name="phone-verify" options={{ title: "Enter code" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot password" }}
      />
    </Stack>
  );
}
