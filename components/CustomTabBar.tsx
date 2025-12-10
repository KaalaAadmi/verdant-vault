import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabBarProps & { accent: string; background: string };

export default function CustomTabBar({ state, descriptors, navigation, accent, background }: Props) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: background, height: 64 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        const onLongPress = () => navigation.emit({ type: "tabLongPress", target: route.key });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopWidth: isFocused ? 3 : 0, borderTopColor: isFocused ? accent : "transparent" }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {options.tabBarIcon?.({ focused: isFocused, color: isFocused ? accent : "#8a8a8a", size: 24 })}
              {label ? (
                <Text style={{ marginTop: 4, fontSize: 12, color: isFocused ? accent : "#8a8a8a" }}>{label}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
