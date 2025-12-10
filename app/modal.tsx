import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

const SAVED = [
  {
    id: "a1",
    label: "Home",
    address: "1226 University, City",
    coords: { latitude: 37.78825, longitude: -122.4324 },
  },
  {
    id: "a2",
    label: "Work",
    address: "123 Corporate Ave, City",
    coords: { latitude: 37.78, longitude: -122.43 },
  },
];

export default function LocationModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    current?: string;
    lat?: string;
    lng?: string;
  }>();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (params.lat && params.lng) {
      const lat = Number(params.lat);
      const lng = Number(params.lng);
      if (!isNaN(lat) && !isNaN(lng))
        setRegion((r) => ({ ...r, latitude: lat, longitude: lng }));
    }
  }, [params.lat, params.lng]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const pos = await Location.getCurrentPositionAsync({});
      setRegion((r) => ({
        ...r,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
    })();
  }, []);

  const filtered = SAVED.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.address.toLowerCase().includes(query.toLowerCase())
  );

  const setLocation = async (text: string) => {
    await AsyncStorage.setItem("user.location", text);
    router.back();
  };

  const useCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      const g = geo[0];
      const text = [g?.name, g?.street, g?.city].filter(Boolean).join(", ");
      await setLocation(text || "Current location");
    } catch (e) {
      await setLocation("Current location");
    }
  };

  const ListHeader = (
    <View style={{ flex: 1, bottom: 0, height: "100%" }}>
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: accent,
          borderRadius: 12,
          paddingHorizontal: 8,
          height: 40,
        }}
      >
        <Ionicons name="search" size={20} color={accent} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search saved addresses"
          placeholderTextColor="#8a8a8a"
          style={{
            flex: 1,
            paddingHorizontal: 8,
            color: accent,
            fontSize: 16,
          }}
        />
      </View>

      {/* Use current location */}
      <View style={{ marginTop: 16 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
          }}
          onPress={useCurrentLocation}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-outline" size={20} color={accent} />
            <Text style={{ marginLeft: 8, color: accent, fontWeight: "600" }}>
              Use current location
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={accent} />
        </TouchableOpacity>
        {params.current ? (
          <Text style={{ marginLeft: 28, color: "#8a8a8a" }}>
            {params.current}
          </Text>
        ) : null}
      </View>

      {/* Add address */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
        onPress={() => router.push("/add-address")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="add-outline" size={20} color={accent} />
          <Text style={{ marginLeft: 8, color: accent, fontWeight: "600" }}>
            Add address
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={accent} />
      </TouchableOpacity>

      {/* Saved addresses title */}
      <Text style={{ marginTop: 12, color: "#8a8a8a", fontWeight: "700" }}>
        Saved Addresses
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={{ flex: 1, justifyContent: "flex-start", height: "100%" }}>
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderWidth: 1,
            borderColor: "#e9efea",
            backgroundColor: background,
            padding: 16,
            height: "100%",
          }}
        >
          {/* Header at top flush */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: accent, fontWeight: "700", fontSize: 16 }}>
              Choose Location
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: accent,
              }}
            >
              <Ionicons name="chevron-down" size={20} color={accent} />
            </TouchableOpacity>
          </View>
          {/* Separator under header */}
          <View
            style={{
              height: 1,
              backgroundColor: "#e9efea",
              marginTop: 8,
            }}
          />

          {/* Map (hidden when searching) */}
          {!searchFocused && (
            <MapView
              style={{ height: 320, borderRadius: 12, marginTop: 12 }}
              initialRegion={region}
            >
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
          )}

          {/* Content fills remaining space */}
          <View style={{ flex: 1, marginTop: 12, bottom: 0 }}>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={ListHeader}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ paddingVertical: 12 }}
                  onPress={() => setLocation(`${item.label} • ${item.address}`)}
                >
                  <Text style={{ color: accent, fontWeight: "600" }}>
                    {item.label}
                  </Text>
                  <Text style={{ color: "#8a8a8a" }}>{item.address}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text
                  style={{
                    color: "#8a8a8a",
                    paddingVertical: 16,
                    textAlign: "center",
                  }}
                >
                  No saved addresses found
                </Text>
              }
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 8, flexGrow: 1 }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
