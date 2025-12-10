import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const accent = "#1f6736";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  color?: string;
};
export function Link({ children, onPress, color = accent }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color, fontWeight: "700" }}>{children as any}</Text>
    </TouchableOpacity>
  );
}
