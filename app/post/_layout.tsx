// app/Profile/_layout.tsx
import { Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}
