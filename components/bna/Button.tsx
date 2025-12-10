import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const accent = "#1f6736";

type Props = {
  title: string;
  onPress?: () => void;
  color?: string;
  loading?: boolean;
};
export function Button({ title, onPress, color = accent, loading }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
