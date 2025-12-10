import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const accent = "#1f6736";
const background = "#f7fcf9";

type Props = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
  accentColor?: string;
};
export function InputOTP({ length = 6, value, onChange, accentColor = accent }: Props) {
  const cells = Array.from({ length });
  const onKey = (i: number, v: string) => {
    const next = value.split("");
    next[i] = v.slice(-1);
    onChange(next.join("").slice(0, length));
  };
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {cells.map((_, i) => (
        <TextInput
          key={i}
          value={value[i] || ""}
          onChangeText={(v) => onKey(i, v)}
          keyboardType="number-pad"
          maxLength={1}
          style={{
            width: 42,
            height: 48,
            textAlign: "center",
            borderWidth: 1,
            borderColor: "#e9efea",
            backgroundColor: background,
            borderRadius: 10,
            color: accentColor,
            fontWeight: "700",
          }}
        />
      ))}
      <TouchableOpacity onPress={() => onChange("")}> 
        <Text style={{ color: accentColor, marginLeft: 8 }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}
