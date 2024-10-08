import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useContext, useEffect, useMemo } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Link, router } from "expo-router";
import MyContext from "./providers/MyContext";
import { Image } from "expo-image";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const context = useContext<any>(MyContext);
  const { setLoginToggle, myInfo, loggedIn } = context;
  const handlePress = () => navigation.dispatch(DrawerActions.openDrawer());
  
  const mortyUrl =
    "https://cdn.costumewall.com/wp-content/uploads/2017/01/morty-smith.jpg";

  const profileImageUri = useMemo(() => {
    if (myInfo?.id) {
      return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${myInfo?.id}?${Date.now()}`;
    }
    return mortyUrl; // Fallback URL
  }, [myInfo?.id]);
  const blurhash =  myInfo?.blurhash || 'U~I#+9xuRjj[_4t7aej[xvjYoej[WCWAkCoe'
  return (
    <ThemedView style={styles.page}>
      {loggedIn ? (
        <Pressable onPress={handlePress}>
          <Image
            style={styles.profilePic}
            source={{
              uri: profileImageUri,
            }}
            placeholder={{blurhash}}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            router.navigate("/login");
          }}
        >
          <ThemedText style={{ marginLeft: 5 }}>Login</ThemedText>
        </Pressable>
      )}
      <ThemedText style={styles.Title}>{name}</ThemedText>
      <ThemedView style={{ width: 35 }}></ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "rgb(232,232,232)",
  },
  profilePic: {
    borderRadius: 15,
    width: 35,
    height: 35,
  },
  Title: {
    fontSize: 25,
  },
});
