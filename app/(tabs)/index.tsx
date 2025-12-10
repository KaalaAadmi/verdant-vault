import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";
const { width } = Dimensions.get("window");

const HOME_CATEGORIES = [
  { key: "flower", label: "Flower", icon: "leaf-outline" },
  { key: "apparel", label: "Apparel", icon: "shirt-outline" },
  { key: "edibles", label: "Edibles", icon: "bag-handle-outline" },
  { key: "pre-rolls", label: "Pre-rolls", icon: "cafe-outline" },
  { key: "tinctures", label: "Tinctures", icon: "flask-outline" },
  { key: "seeds", label: "Seeds", icon: "beaker-outline" },
  { key: "cbd", label: "CBD", icon: "medkit-outline" },
];

const RECOMMENDED = [
  {
    id: "p1",
    brand: "INDICA",
    title: "Organic Rockstar Tuna - 3.5g",
    image: null,
  },
  {
    id: "p2",
    brand: "BACK FORTY",
    title: "Distillate Infused Pre-Rolls - 3x0.5g",
    image: null,
  },
  {
    id: "p3",
    brand: "INDICA",
    title: "Island Sweet Skunk - 3.5g",
    image: null,
  },
  { id: "p4", brand: "SATIVA", title: "Blue Dream - 3.5g", image: null },
];

const HERO_SLIDES = [0, 1, 2];

const formatAddress = (g: any) => {
  const area =
    g?.district || g?.subregion || g?.neighborhood || g?.subLocality || g?.name;
  const city = g?.city || g?.region;
  return [area, city].filter(Boolean).join(", ");
};

export default function HomeScreen() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [heroIndex, setHeroIndex] = useState(0);
  const [currentLoc, setCurrentLoc] = useState<string>("");

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required to fetch your current address.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      const first = geo[0];
      const line = formatAddress(first);
      console.log("Current location:", line);
      setCurrentLoc(line);
      await AsyncStorage.setItem("user.location", line);
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const saved = await AsyncStorage.getItem("user.location");
        if (saved) {
          setCurrentLoc(saved);
          console.log("Saved location on focus:", saved);
        }
      })();
      return () => {};
    }, [])
  );

  const renderCategory = (item: {
    key: string;
    label: string;
    icon: string;
  }) => (
    <View
      key={item.key}
      style={{ width: "25%", alignItems: "center", marginVertical: 10 }}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/productList",
            params: { category: item.key },
          })
        }
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          backgroundColor: background,
          borderWidth: 1,
          borderColor: "#e9efea",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        }}
      >
        <Ionicons name={item.icon as any} size={28} color={accent} />
      </TouchableOpacity>
      <Text style={{ marginTop: 8, color: accent, fontWeight: "600" }}>
        {item.label}
      </Text>
    </View>
  );

  const renderProduct = ({ item }: { item: (typeof RECOMMENDED)[number] }) => (
    <ProductCard
      item={{
        id: item.id,
        brand: item.brand,
        title: item.title,
        image: item.image,
      }}
      liked={!!favorites[item.id]}
      onToggleFavorite={(id) => setFavorites((f) => ({ ...f, [id]: !f[id] }))}
      onPress={(id) =>
        router.push({ pathname: "/product/[id]", params: { id } })
      }
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {/* Header / Search toggle */}
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
                  if (text?.trim())
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
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      router.push({
                        pathname: "/modal",
                        params: { current: currentLoc },
                      })
                    }
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color={accent}
                    />
                    <Text
                      style={{
                        marginLeft: 6,
                        color: accent,
                        fontWeight: "600",
                      }}
                    >
                      {currentLoc || "Select location"}
                    </Text>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={accent}
                      style={{ marginLeft: 4 }}
                    />
                  </TouchableOpacity>
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

        {/* Hero carousel using reanimated-carousel */}
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <Carousel
            width={width - 32}
            height={180}
            data={HERO_SLIDES}
            loop
            onSnapToItem={(idx) => setHeroIndex(idx)}
            renderItem={() => (
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  margin: 8,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: "#cfead9",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text
                      style={{ color: accent, fontWeight: "700", fontSize: 18 }}
                    >
                      Get 10% Discounts{"\n"}On All Items!
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginTop: 12,
                        backgroundColor: accent,
                        borderRadius: 12,
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        Order Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 12,
                      backgroundColor: "#b7dfcc",
                    }}
                  />
                </View>
              </View>
            )}
          />
          {/* Pagination: grey dots with active as a line */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              {HERO_SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === heroIndex ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: i === heroIndex ? accent : "#cfcfcf",
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Categories section */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
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
              CATEGORIES
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
          </View>
          <View
            style={{
              borderRadius: 16,
              backgroundColor: background,
              borderWidth: 1,
              borderColor: "#e9efea",
              paddingVertical: 12,
              paddingHorizontal: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {HOME_CATEGORIES.map(renderCategory)}
              {/* View more */}
              <View
                key="view-more"
                style={{
                  width: "25%",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/categories")}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "#e6f2ea",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="arrow-forward" size={24} color={accent} />
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 8, color: accent, fontWeight: "600" }}
                >
                  View More
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recommended grid */}
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
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
              RECOMMENDED FOR YOU
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
          </View>
        </View>

        <FlatList
          data={RECOMMENDED}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
