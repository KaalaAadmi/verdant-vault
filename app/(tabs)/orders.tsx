import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import SearchBar from "@/components/SearchBar";

const accent = "#1f6736";
const background = "#f7fcf9";

type Order = {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Cancelled" | "Processing";
  items: number;
};

const ORDERS: Order[] = [
  { id: "o1", date: "2025-11-20", total: 49.28, status: "Delivered", items: 2 },
  { id: "o2", date: "2025-11-12", total: 28.48, status: "Cancelled", items: 1 },
  { id: "o3", date: "2025-10-30", total: 89.97, status: "Delivered", items: 3 },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: background,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e9efea",
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
      onPress={() => router.push({ pathname: "/order/[id]", params: { id: item.id } })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: accent, fontWeight: "700" }}>Order #{item.id.toUpperCase()}</Text>
          <Text style={{ color: "#8a8a8a", marginTop: 4 }}>
            {item.date} • {item.items} items
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: accent, fontWeight: "700" }}>${item.total.toFixed(2)}</Text>
          <Text
            style={{
              color:
                item.status === "Delivered"
                  ? "#1f9e4b"
                  : item.status === "Cancelled"
                  ? "#d83c3c"
                  : accent,
              fontWeight: "600",
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
        <View style={{ height: 40, justifyContent: "center" }}>
          {searching ? (
            <SearchBar
              accent={accent}
              background={background}
              onCancel={() => setSearching(false)}
              onSubmit={(text) => {
                setSearching(false);
                if (text?.trim()) router.push({ pathname: "/productList", params: { query: text.trim() } });
              }}
            />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 24, fontWeight: "700", color: accent }}>Orders</Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
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
                  <Ionicons name="notifications-outline" size={20} color={accent} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: "#e9efea" }} />
      <FlatList
        data={ORDERS}
        keyExtractor={(o) => o.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8, paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
