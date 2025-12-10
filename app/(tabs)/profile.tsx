import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

const accent = "#1f6736";
const background = "#f7fcf9";

type Address = { id: string; label: string; line: string };

const ProfileScreen = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [name, setName] = useState("John Doe");
  const [email] = useState("john@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "a1", label: "Home", line: "Hiranandani Estate, Thane" },
    { id: "a2", label: "Work", line: "1226 University, City" },
  ]);

  const initialName = "John Doe";
  const initialPhone = "+91 9876543210";
  const changed = name !== initialName || phone !== initialPhone;

  const renderAddress = ({ item }: { item: Address }) => (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 8,
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
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Ionicons name="location-outline" size={20} color={accent} />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text style={{ color: accent, fontWeight: "700" }}>{item.label}</Text>
          <Text style={{ color: "#8a8a8a" }}>{item.line}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/add-address",
            params: { address: item.line },
          })
        }
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
        <Ionicons name="create-outline" size={18} color={accent} />
      </TouchableOpacity>
    </View>
  );

  const onUpdate = () => {
    if (!changed) return;
    // TODO: call profile update API
    alert("Profile updated");
  };

  const ListHeader = (
    <View>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
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
            Profile
          </Text>
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
            >
              <Ionicons name="notifications-outline" size={20} color={accent} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: "#e9efea" }} />

      {/* User info card */}
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
          {/* Name */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: "#8a8a8a" }}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#8a8a8a"
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
              style={{
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 36,
                minWidth: 180,
                color: accent,
                textAlign: "right",
              }}
            />
          </View>
          {/* Email readonly */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: "#8a8a8a" }}>Email</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e9efea",
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 36,
                justifyContent: "center",
                minWidth: 180,
                backgroundColor: "#f0f5f2",
              }}
            >
              <Text
                style={{
                  color: accent,
                  fontWeight: "700",
                  textAlign: "right",
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          {/* Phone */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: "#8a8a8a" }}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Your phone"
              placeholderTextColor="#8a8a8a"
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
              style={{
                borderWidth: 1,
                borderColor: accent,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 36,
                minWidth: 180,
                color: accent,
                textAlign: "right",
              }}
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#e9efea",
              marginVertical: 6,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: "#8a8a8a" }}>Loyalty Tier</Text>
            <Text style={{ color: accent, fontWeight: "700" }}>Green</Text>
          </View>
          <TouchableOpacity
            onPress={onUpdate}
            disabled={!changed}
            style={{
              marginTop: 12,
              borderRadius: 12,
              paddingVertical: 10,
              alignItems: "center",
              backgroundColor: changed ? accent : "#cfead9",
            }}
          >
            <Text
              style={{
                color: changed ? "#fff" : "#8a8a8a",
                fontWeight: "700",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Addresses title */}
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
            ADDRESSES
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#e9efea" }} />
        </View>
      </View>
    </View>
  );

  const ListFooter = (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
      <TouchableOpacity
        onPress={() => router.push("/add-address")}
        style={{
          backgroundColor: accent,
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          Add New Address
        </Text>
      </TouchableOpacity>
      {/* Actions */}
      <View style={{ marginTop: 12 }}>
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
            onPress={() => router.push("/orders")}
          >
            <Text style={{ color: accent, fontWeight: "600" }}>My Orders</Text>
            <Ionicons name="chevron-forward" size={18} color={accent} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: accent, fontWeight: "600" }}>
              Payment Methods
            </Text>
            <Ionicons name="chevron-forward" size={18} color={accent} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: accent, fontWeight: "600" }}>
              Preferences
            </Text>
            <Ionicons name="chevron-forward" size={18} color={accent} />
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "#e9efea",
              marginVertical: 6,
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
            onPress={async () => {
              try {
                await signOut();
                router.replace("/(auth)/login" as any);
              } catch {}
            }}
          >
            <Text style={{ color: "#d83c3c", fontWeight: "700" }}>
              Log Out
            </Text>
            <Ionicons name="exit-outline" size={18} color={"#d83c3c"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <FlatList
            data={addresses}
            keyExtractor={(a) => a.id}
            renderItem={renderAddress}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;
