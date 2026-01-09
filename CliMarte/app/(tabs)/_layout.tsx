import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/src/components/haptic-tab'; // Asegúrate que la ruta sea correcta a tu src
import { IconSymbol } from '@/src/components/ui/icon-symbol'; // Asegúrate que la ruta sea correcta a tu src
import { Colors } from '@/src/constants/theme'; // O constants/Colors
import { useColorScheme } from '@/src/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      {/* Tab 1: Dashboard / Home /}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Estación',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/ Tab 2: Lista / Historial (Antes Explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />, 
        }}
      />
    </Tabs>
  );
}