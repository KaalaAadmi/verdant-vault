import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  accent?: string;
  background?: string;
  placeholder?: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
};

export default function SearchBar({
  accent = "#1f6736",
  background = "#f7fcf9",
  placeholder = "Search products",
  onSubmit,
  onCancel,
}: Props) {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: background,
        borderWidth: 1,
        borderColor: accent,
        borderRadius: 12,
        paddingHorizontal: 8,
        height: 40,
      }}
    >
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onCancel}
        style={{ padding: 4 }}
      >
        <Ionicons name="chevron-back" size={20} color={accent} />
      </TouchableOpacity>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#8a8a8a"
        style={{ flex: 1, paddingHorizontal: 8, color: accent, fontSize: 16 }}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit(text)}
      />
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => onSubmit(text)}
        style={{ padding: 4 }}
      >
        <Ionicons name="search" size={20} color={accent} />
      </TouchableOpacity>
    </View>
  );
}
