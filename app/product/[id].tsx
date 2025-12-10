import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";
const width = Dimensions.get("window").width;

const CATALOG: Record<
  string,
  { title: string; brand: string; images: string[]; sizes: string[] }
> = {
  p1: {
    title: "Organic Rockstar Tuna - 3.5g",
    brand: "INDICA",
    images: ["img1", "img2", "img3"],
    sizes: ["1g", "3.5g", "7g"],
  },
  p2: {
    title: "Distillate Infused Pre-Rolls - 3x0.5g",
    brand: "BACK FORTY",
    images: ["img1", "img2"],
    sizes: ["0.5g", "1g"],
  },
  p3: {
    title: "Island Sweet Skunk - 3.5g",
    brand: "INDICA",
    images: ["img1"],
    sizes: ["3.5g"],
  },
  p4: {
    title: "Blue Dream - 3.5g",
    brand: "SATIVA",
    images: ["img1", "img2"],
    sizes: ["3.5g", "7g"],
  },
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = (id && CATALOG[id]) || {
    title: "Product",
    brand: "",
    images: ["img1"],
    sizes: [],
  };
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const onAddToCart = () => {
    if (!size || qty < 1) {
      // simple validation; replace with toast/snackbar
      alert("Select a size and quantity before adding to cart.");
      return;
    }
    // TODO: integrate with cart store
    alert(`Added: ${product.title} • ${size} x${qty}`);
  };

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
          <Text
            style={{ color: accent, fontWeight: "700", fontSize: 18 }}
            numberOfLines={1}
          >
            {product.title}
          </Text>
          <View style={{ width: 36 }} />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: "#e9efea" }} />

      {/* Image carousel using reanimated-carousel */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <Carousel
          width={width - 32}
          height={220}
          data={product.images}
          loop
          onSnapToItem={(idx: number) => setActiveImage(idx)}
          renderItem={() => (
            <View
              style={{
                flex: 1,
                borderRadius: 16,
                marginHorizontal: 8,
                backgroundColor: "#e6f2ea",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="image-outline" size={40} color={accent} />
            </View>
          )}
        />
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {product.images.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === activeImage ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === activeImage ? accent : "#cfcfcf",
                }}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Details */}
      <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
        <Text style={{ color: "#8a8a8a" }}>{product.brand}</Text>
        <Text style={{ color: accent, fontWeight: "700", fontSize: 18 }}>
          {product.title}
        </Text>
      </View>

      {/* Size selector */}
      <View
        style={{
          marginTop: 16,
          paddingHorizontal: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {product.sizes.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSize(s)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: size === s ? accent : "#e9efea",
              backgroundColor: size === s ? "#eef7f1" : background,
            }}
          >
            <Text style={{ color: accent, fontWeight: "600" }}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quantity selector */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => setQty(Math.max(1, qty - 1))}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: accent, fontSize: 18 }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{ marginHorizontal: 16, color: accent, fontWeight: "700" }}
        >
          {qty}
        </Text>
        <TouchableOpacity
          onPress={() => setQty(qty + 1)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: accent, fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to cart */}
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={onAddToCart}
          style={{
            marginTop: 24,
            backgroundColor: accent,
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
