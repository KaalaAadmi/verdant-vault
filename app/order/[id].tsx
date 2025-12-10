import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

type OrderDetail = {
  id: string;
  date: string;
  status: "Delivered" | "Cancelled" | "Processing";
  items: { id: string; title: string; qty: number; price: number }[];
  address: string;
};

const ORDER_DB: Record<string, OrderDetail> = {
  o1: {
    id: "o1",
    date: "2025-11-20",
    status: "Delivered",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    items: [
      { id: "p1", title: "Organic Rockstar Tuna - 3.5g", qty: 1, price: 28.48 },
      { id: "p2", title: "Color - Black Sugar Rose", qty: 1, price: 25.97 },
    ],
  },
  o2: {
    id: "o2",
    date: "2025-11-12",
    status: "Cancelled",
    address: "1226 University, City",
    items: [
      { id: "p1", title: "Organic Rockstar Tuna - 3.5g", qty: 1, price: 28.48 },
    ],
  },
  o3: {
    id: "o3",
    date: "2025-10-30",
    status: "Delivered",
    address: "Hiranandani Estate, Thane",
    items: [
      { id: "p1", title: "Organic Rockstar Tuna - 3.5g", qty: 2, price: 28.48 },
      { id: "p3", title: "Island Sweet Skunk - 3.5g", qty: 1, price: 32.01 },
    ],
  },
};

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = (id && ORDER_DB[id]) || ORDER_DB["o1"];

  const subtotal = order.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const delivery = 0;
  const discount = 0;
  const grandTotal = subtotal + delivery - discount;

  const renderItem = ({ item }: { item: OrderDetail["items"][number] }) => (
    <View
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
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            backgroundColor: "#e6f2ea",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="image-outline" size={24} color={accent} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: accent, fontWeight: "700" }}>{item.title}</Text>
          <Text style={{ marginTop: 6, color: "#8a8a8a" }}>
            Qty: {item.qty}
          </Text>
          <Text style={{ marginTop: 4, color: accent, fontWeight: "700" }}>
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
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
            <Ionicons name="chevron-back" size={20} color={accent} />
          </TouchableOpacity>
          <Text style={{ color: accent, fontWeight: "700", fontSize: 18 }}>
            Order #{order.id.toUpperCase()}
          </Text>
          <View style={{ width: 36 }} />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: "#e9efea" }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Summary */}
        <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
          <View
            style={{
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
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Date</Text>
              <Text style={{ color: accent, fontWeight: "700" }}>
                {order.date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Status</Text>
              <Text
                style={{
                  color:
                    order.status === "Delivered"
                      ? "#1f9e4b"
                      : order.status === "Cancelled"
                      ? "#d83c3c"
                      : accent,
                  fontWeight: "700",
                }}
              >
                {order.status}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Items</Text>
              <Text style={{ color: accent, fontWeight: "700" }}>
                {order.items.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Items list */}
        <FlatList
          data={order.items}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 16 }}
        />

        {/* Delivery address */}
        <View style={{ marginTop: 8, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
            <Text
              style={{
                marginHorizontal: 12,
                color: "#8a8a8a",
                fontWeight: "700",
              }}
            >
              DELIVER TO
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
          </View>
          <View
            style={{
              backgroundColor: background,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#e9efea",
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Ionicons name="location-outline" size={20} color={accent} />
              <Text
                style={{
                  marginLeft: 8,
                  color: accent,
                  fontWeight: "600",
                  flex: 1,
                }}
                numberOfLines={3}
              >
                {order.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Totals */}
        <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
            <Text
              style={{
                marginHorizontal: 12,
                color: "#8a8a8a",
                fontWeight: "700",
              }}
            >
              BILL SUMMARY
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
          </View>
          <View
            style={{
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
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Subtotal</Text>
              <Text style={{ color: accent, fontWeight: "700" }}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Delivery Charge</Text>
              <Text style={{ color: "#1f9e4b", fontWeight: "700" }}>FREE</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#e9efea",
                marginVertical: 4,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Discount</Text>
              <Text style={{ color: accent, fontWeight: "700" }}>- $0.00</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#e9efea",
                marginVertical: 4,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#8a8a8a" }}>Grand Total</Text>
              <Text style={{ color: accent, fontWeight: "700" }}>
                ${grandTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
