import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";

const accent = "#1f6736";
const background = "#f7fcf9";

const ALL_PRODUCTS = [
	{
		id: "p1",
		brand: "INDICA",
		title: "Organic Rockstar Tuna - 3.5g",
		image: null,
		category: "flower",
	},
	{
		id: "p2",
		brand: "BACK FORTY",
		title: "Distillate Infused Pre-Rolls - 3x0.5g",
		image: null,
		category: "pre-rolls",
	},
	{
		id: "p3",
		brand: "INDICA",
		title: "Island Sweet Skunk - 3.5g",
		image: null,
		category: "flower",
	},
	{
		id: "p4",
		brand: "SATIVA",
		title: "Blue Dream - 3.5g",
		image: null,
		category: "flower",
	},
	{
		id: "p5",
		brand: "PURE",
		title: "CBD Oil - 30ml",
		image: null,
		category: "cbd",
	},
];

export default function ProductList() {
	const router = useRouter();
	const { category, query } = useLocalSearchParams<{
		category?: string;
		query?: string;
	}>();
	const [favorites, setFavorites] = useState<Record<string, boolean>>({});

	const filtered = ALL_PRODUCTS.filter((p) => {
		if (category) return p.category === category;
		if (query) return p.title.toLowerCase().includes(query.toLowerCase());
		return true;
	});

	const titleText = category
		? category.charAt(0).toUpperCase() + category.slice(1)
		: query
		? `Results for "${query}"`
		: "Products";

	const renderProduct = ({
		item,
	}: {
		item: (typeof ALL_PRODUCTS)[number];
	}) => (
		<ProductCard
			item={{ id: item.id, brand: item.brand, title: item.title, image: item.image }}
			liked={!!favorites[item.id]}
			onToggleFavorite={(id) => setFavorites((f) => ({ ...f, [id]: !f[id] }))}
			onPress={(id) => router.push({ pathname: '/product/[id]', params: { id } })}
		/>
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: background }}>
			<View
				style={{
					paddingHorizontal: 16,
					paddingTop: 4,
					paddingBottom: 12,
				}}
			>
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
						style={{
							color: accent,
							fontWeight: "700",
							fontSize: 18,
						}}
					>
						{titleText}
					</Text>
					<View style={{ width: 36 }} />
				</View>
			</View>
			<View style={{ height: 1, backgroundColor: "#e9efea" }} />
			<FlatList
				data={filtered}
				numColumns={2}
				keyExtractor={(item) => item.id}
				renderItem={renderProduct}
				contentContainerStyle={{
					paddingHorizontal: 8,
					paddingBottom: 16,
				}}
			/>
		</SafeAreaView>
	);
}
