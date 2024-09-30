import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // Theme context


export default function DrawerLayout() {
  const {currentTheme} = useTheme();
  console.log(currentTheme);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: '#f0f0f5',
        width: 250,
      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    }}>
      <Drawer.Screen
        name="index"
        options={{
          headerShown: false,
          drawerLabel: "Home",
          headerTitle: "Home Title",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />

    </Drawer>
  </GestureHandlerRootView>
  );
}
