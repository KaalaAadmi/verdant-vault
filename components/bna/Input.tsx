import React from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";

const accent = "#1f6736";
const background = "#f7fcf9";

type Props = TextInputProps & { label?: string };
export function Input({ label, style, ...props }: Props) {
  return (
    <View>
      {label ? (
        <Text style={{ marginBottom: 6, color: accent, fontWeight: "600" }}>{label}</Text>
      ) : null}
      <TextInput
        {...props}
        style={[
          {
            borderWidth: 1,
            borderColor: "#e9efea",
            backgroundColor: background,
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 12,
            color: accent,
          },
          style as any,
        ]}
      />
    </View>
  );
}
