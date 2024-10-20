import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Dimensions } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MyProvider } from "../components/providers/MyContext";
import { PostProvider } from "../components/providers/PostContext";
import { ThemedView } from "@/components/ThemedView";
import { MessageProvider } from "@/components/providers/MessageContext";
import DesktopRouting from "@/components/desktopComponents/desktopRouting";
import StackLogos from "@/components/desktopComponents/stackLogos";
import LinkedinProfiles from "@/components/desktopComponents/linkedinProfiles";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // UseEffect to monitor window size changes
  useEffect(() => {
    const handleResize = () => {
      const newWidth = Dimensions.get("window").width;
      setWindowWidth(newWidth);
    };
    const subscription = Dimensions.addEventListener("change", handleResize);    
    return () => {
      subscription?.remove(); 
    };
  }, []);

  if (!loaded) {
    return null;
  }

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
                  {windowWidth > 1000 ? (
                    <ThemedView style={styles.row}>
                      <ThemedView style={styles.content}>
                        <ThemedView style={styles.column}>
                          <DesktopRouting />
                          <StackLogos />
                        </ThemedView>
                        <Stack
                          screenOptions={{
                            headerShown: false,
                            animation: "slide_from_right",
                          }}
                        >
                          <Stack.Screen name="(drawer)" />
                        </Stack>
                        <ThemedView style={styles.none}>
                          <LinkedinProfiles />
                        </ThemedView>
                      </ThemedView>
                    </ThemedView>
                  ) : (
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                      }}
                    >
                      <Stack.Screen name="(drawer)" />
                    </Stack>
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

const styles = StyleSheet.create({
  column: {
    height: "80%",
    flexDirection: "column",
    zIndex: 1000,
  },
  none: {
    display: "flex",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    height: 900,
  },
});
