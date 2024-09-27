import { Slot } from 'expo-router';

export default function _layout() {
  return <Slot screenOptions={{ headerShown: false }} />;
}
