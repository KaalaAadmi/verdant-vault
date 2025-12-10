import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    key: "flower",
    label: "Flower",
    icon: { name: "leaf-outline", filled: "leaf" },
  },
  {
    key: "apparel",
    label: "Apparel",
    icon: { name: "shirt-outline", filled: "shirt" },
  },
  {
    key: "edibles",
    label: "Edibles",
    icon: { name: "bag-handle-outline", filled: "bag-handle" },
  },
  {
    key: "pre-rolls",
    label: "Pre-rolls",
    icon: { name: "cafe-outline", filled: "cafe" },
  },
  {
    key: "tinctures",
    label: "Tinctures",
    icon: { name: "flask-outline", filled: "flask" },
  },
  {
    key: "seeds",
    label: "Seeds",
    icon: { name: "beaker-outline", filled: "beaker" },
  },
  {
    key: "cbd",
    label: "CBD",
    icon: { name: "medkit-outline", filled: "medkit" },
  },
  {
    key: "dabs",
    label: "Dabs",
    icon: { name: "beaker-outline", filled: "beaker" },
  },
  {
    key: "gummies",
    label: "Gummies",
    icon: { name: "apps-outline", filled: "apps" },
  },
  {
    key: "books",
    label: "Books",
    icon: { name: "book-outline", filled: "book" },
  },
  {
    key: "clones",
    label: "Clones",
    icon: { name: "leaf-outline", filled: "leaf" },
  },
  {
    key: "beverage",
    label: "Beverage",
    icon: { name: "wine-outline", filled: "wine" },
  },
];

export default function CategoriesScreen() {
  const accent = "#1f6736";
  const background = "#f7fcf9";
  const [selected, setSelected] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const navigation = useNavigation();

  // Reset selection whenever returning to this screen (more intuitive UX)
  useFocusEffect(
    useCallback(() => {
      setSelected(null);
      return () => {};
    }, [])
  );

  const goToProductList = (params: { category?: string; query?: string }) => {
    // @ts-ignore route exists in your stack
    navigation.navigate("productList" as never, params as never);
  };

  const renderItem = ({ item }: { item: (typeof DATA)[number] }) => {
    const isSelected = selected === item.key;
    return (
      <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 12 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSelected ? "#eef7f1" : background,
            borderRadius: 16,
            // square: width equals height
            aspectRatio: 1,
            // shadow subtle
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
            borderWidth: 1,
            borderColor: isSelected ? accent : "#e9efea",
          }}
          onPress={() => {
            const nextSelected = isSelected ? null : item.key;
            setSelected(nextSelected);
            if (nextSelected) {
              goToProductList({ category: nextSelected });
            }
          }}
        >
          <Ionicons
            name={(isSelected ? item.icon.filled : item.icon.name) as any}
            size={36}
            color={accent}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 16,
            color: accent,
            fontWeight: "600",
          }}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      {/* Header container with fixed height to avoid layout shift */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: 12,
        }}
      >
        <View style={{ height: 40, justifyContent: "center" }}>
          {searching ? (
            <SearchBar
              accent={accent}
              background={background}
              onCancel={() => setSearching(false)}
              onSubmit={(text) => {
                setSearching(false);
                if (text?.trim()) goToProductList({ query: text.trim() });
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: accent,
                }}
              >
                Categories
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: background,
                    borderWidth: 1,
                    borderColor: accent,
                  }}
                  onPress={() => setSearching(true)}
                >
                  <Ionicons name="search" size={20} color={accent} />
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: background,
                    borderWidth: 1,
                    borderColor: accent,
                  }}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={accent}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: "#e9efea" }} />

      {/* Grid fills area with equal spacing */}
      <FlatList
        data={DATA}
        numColumns={3}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 8,
          paddingBottom: 16,
        }}
        columnWrapperStyle={{}}
      />
    </SafeAreaView>
  );
}
