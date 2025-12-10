import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const accent = "#1f6736";
const background = "#f7fcf9";

export default function AddAddressModal() {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [flat, setFlat] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  React.useEffect(() => {
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

  const save = async () => {
    if (!label || !locality || !city) {
      alert("Please fill label, locality and city");
      return;
    }
    const address = [flat, building, locality, city, pincode]
      .filter(Boolean)
      .join(", ");
    const entry = `${label} • ${address}`;
    await AsyncStorage.setItem("user.location", entry);
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: background,
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <View style={{ flex: 1, justifyContent: "flex-start", height: "100%" }}>
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderWidth: 1,
            borderColor: "#e9efea",
            backgroundColor: background,
            padding: 16,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: accent, fontWeight: "700", fontSize: 16 }}>
              Add Address
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

          {/* Larger map with pin placement */}
          <MapView
            style={{ height: 280, borderRadius: 12, marginTop: 12 }}
            initialRegion={region}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setRegion((r) => ({ ...r, latitude, longitude }));
            }}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          </MapView>

          {/* Detailed form */}
          <View style={{ marginTop: 12 }}>
            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="Label (e.g., Home)"
              placeholderTextColor="#8a8a8a"
              style={{
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
            <TextInput
              value={flat}
              onChangeText={setFlat}
              placeholder="Flat/Apartment"
              placeholderTextColor="#8a8a8a"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
            <TextInput
              value={building}
              onChangeText={setBuilding}
              placeholder="Building"
              placeholderTextColor="#8a8a8a"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
            <TextInput
              value={locality}
              onChangeText={setLocality}
              placeholder="Locality/Street"
              placeholderTextColor="#8a8a8a"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="City"
              placeholderTextColor="#8a8a8a"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
            <TextInput
              value={pincode}
              onChangeText={setPincode}
              placeholder="Pincode"
              placeholderTextColor="#8a8a8a"
              keyboardType="numeric"
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                color: accent,
              }}
            />
          </View>

          {/* Save */}
          <TouchableOpacity
            onPress={save}
            style={{
              marginTop: 16,
              backgroundColor: accent,
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Save Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
