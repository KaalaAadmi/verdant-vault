import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

type CartItem = { id: string; title: string; price: number; qty: number };

const INITIAL_CART: CartItem[] = [
  { id: "c1", title: "Organic Rockstar Tuna - 3.5g", price: 28.48, qty: 1 },
  { id: "c2", title: "Color - Black Sugar Rose", price: 25.97, qty: 1 },
];

export default function TabTwoScreen() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [address, setAddress] = useState(
    "2972 Westheimer Rd. Santa Ana, Illinois 85486"
  );
  const [searching, setSearching] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );
  };
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const delivery = 0;
  const discount = 4.9;
  const grandTotal = subtotal + delivery - discount;

  const renderItem = ({ item }: { item: CartItem }) => (
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
          <Text style={{ marginTop: 8, color: accent, fontWeight: "700" }}>
            ${item.price.toFixed(2)}
          </Text>
          <View
            style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => updateQty(item.id, -1)}
              style={{
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                width: 32,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: accent }}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#cfead9",
                backgroundColor: "#eef7f1",
                marginHorizontal: 8,
                borderRadius: 12,
                width: 44,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: accent, fontWeight: "700" }}>
                {String(item.qty).padStart(2, "0")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => updateQty(item.id, 1)}
              style={{
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                width: 32,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: accent }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="trash-outline" size={20} color={accent} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
        {/* Header */}
        <View
          style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}
        >
          <View style={{ height: 40, justifyContent: "center" }}>
            {searching ? (
              <SearchBar
                accent={accent}
                background={background}
                onCancel={() => setSearching(false)}
                onSubmit={(text) => {
                  setSearching(false);
                  router.push({
                    pathname: "/productList",
                    params: { query: text.trim() },
                  });
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: accent,
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    My Cart
                  </Text>
                </View>
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
        <View style={{ height: 1, backgroundColor: "#e9efea" }} />

        {/* Cart list */}
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
        />

        {/* Deliver To */}
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
                numberOfLines={2}
              >
                {address}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: accent,
              }}
              onPress={() =>
                router.push({ pathname: "/add-address", params: { address } })
              }
            >
              <Ionicons name="create-outline" size={18} color={accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Summary */}
        <View
          style={{ marginTop: 12, paddingHorizontal: 16, paddingBottom: 96 }}
        >
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
              <Text style={{ color: accent, fontWeight: "700" }}>
                - ${discount.toFixed(2)}
              </Text>
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

        {/* Bottom bar */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: background,
            borderTopWidth: 1,
            borderTopColor: "#e9efea",
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ color: "#8a8a8a" }}>Amount Total</Text>
            <Text style={{ color: accent, fontWeight: "700" }}>
              ${grandTotal.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: accent,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
