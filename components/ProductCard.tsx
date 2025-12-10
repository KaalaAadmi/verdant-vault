import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const accent = '#1f6736';
const background = '#f7fcf9';

export type ProductSummary = {
  id: string;
  brand: string;
  title: string;
  image?: string | null;
};

type Props = {
  item: ProductSummary;
  liked?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: (id: string) => void;
};

export default function ProductCard({ item, liked, onToggleFavorite, onPress }: Props) {
  const pink = '#d83c7a';
  return (
    <TouchableOpacity
      key={item.id}
      style={{ flex: 1, margin: 8, backgroundColor: background, borderRadius: 16, borderWidth: 1, borderColor: '#e9efea', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 }}
      onPress={() => onPress?.(item.id)}
    >
      <View style={{ height: 140, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="image-outline" size={32} color={accent} />
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ color: '#8a8a8a', fontSize: 12 }}>{item.brand}</Text>
        <Text style={{ color: accent, fontWeight: '600' }}>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e9efea' }}
        onPress={() => onToggleFavorite?.(item.id)}
      >
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={16} color={liked ? pink : accent} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
