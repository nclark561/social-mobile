import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView, Platform, Dimensions } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Stack } from "expo-router";
import MyCustomDrawer from "@/components/MyCustomDrawer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MyProvider } from "../../components/providers/MyContext";
import { PostProvider } from "../../components/providers/PostContext";
import { MessageProvider } from "@/components/providers/MessageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  const windowWidth = Dimensions.get("window").width;
  const isDesktop = Platform.OS === "web" && windowWidth >= 1024;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <MyProvider>
            <MessageProvider>
              <PostProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor }}>
                  {isDesktop ? (
                    // Use Stack Navigator on desktop
                    <Stack>
                      <Stack.Screen
                        name="(tabs)"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="settings"
                        options={{
                          title: "Settings",
                        }}
                      />
                      <Stack.Screen
                        name="login"
                        options={{
                          headerShown: false,
                          title: "Login",
                        }}
                      />
                      <Stack.Screen
                        name="conversation"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="index"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="post"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="profile"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="comment"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="MessageComponents"
                        options={{
                          headerShown: false,
                        }}
                      />
                    </Stack>
                  ) : (
                    // Use Drawer Navigator on mobile and other platforms
                    <Drawer
                      drawerContent={(props) => <MyCustomDrawer {...props} />}
                    >
                      <Drawer.Screen
                        name="(tabs)"
                        options={{
                          drawerLabel: "Home",
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="settings"
                        options={{
                          drawerLabel: "Settings",
                          title: "Settings",
                        }}
                      />
                      <Drawer.Screen
                        name="login"
                        options={{
                          drawerLabel: "Login",
                          title: "Login",
                        }}
                      />
                      <Drawer.Screen
                        name="conversation"
                        options={{
                          drawerLabel: () => null, // Hides it from the drawer
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="index"
                        options={{
                          drawerLabel: () => null, // Hide index route
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="post"
                        options={{
                          drawerLabel: () => null, // Hide post route
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="profile"
                        options={{
                          drawerLabel: () => null, // Hide profile route
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="comment"
                        options={{
                          drawerLabel: () => null, // Hide comment route
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                      <Drawer.Screen
                        name="MessageComponents"
                        options={{
                          drawerLabel: () => null, // Hide message components
                          drawerItemStyle: { display: "none" }, // Hides from drawer
                          headerShown: false,
                        }}
                      />
                    </Drawer>
                  )}
                </SafeAreaView>
              </PostProvider>
            </MessageProvider>
          </MyProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
