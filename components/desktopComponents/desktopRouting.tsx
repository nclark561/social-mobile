import {
    StyleSheet,
    useColorScheme,
    Dimensions
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from ".././ThemedView";
import { ThemedText } from ".././ThemedText";
import { Link } from "expo-router";


export default function DesktopRouting() {
    const colorScheme = useColorScheme()

    return (
        <ThemedView style={styles.desktopHidden}>
            <ThemedView style={styles.iconRow}>
                <Link href={'/(drawer)/(tabs)/'}>
                    <Ionicons size={20} style={{ padding: 10 }} name="home-outline" color={colorScheme === 'dark' ? 'white' : 'black'}></Ionicons>
                    <ThemedText style={styles.iconSelection}>Home</ThemedText>
                </Link>
            </ThemedView>
            <ThemedView style={styles.iconRow}>
                <Link href={'/(drawer)/(tabs)/profile'}>
                    <Ionicons size={20} style={{ padding: 10 }} name="person-outline" color={colorScheme === 'dark' ? 'white' : 'black'}></Ionicons>
                    <ThemedText style={styles.iconSelection}>Profile</ThemedText>
                </Link>
            </ThemedView>
            <ThemedView style={styles.iconRow}>
                <Link href={'/(drawer)/(tabs)/messages'}>
                    <Ionicons size={20} style={{ padding: 10 }} name="mail-outline" color={colorScheme === 'dark' ? 'white' : 'black'}></Ionicons>
                    <ThemedText style={styles.iconSelection}>Messages</ThemedText>
                </Link>
            </ThemedView>
            <ThemedView style={styles.iconRow}>
                <Link href={'/(tabs)/explore'}>
                    <Ionicons size={20} style={{ padding: 10 }} name="search-outline" color={colorScheme === 'dark' ? 'white' : 'black'}></Ionicons>
                    <ThemedText style={styles.iconSelection}>Search</ThemedText>
                </Link>
            </ThemedView>
            <ThemedView style={styles.iconRow}>
                <Link href={'/(drawer)/login'}>
                    <Ionicons size={20} style={{ padding: 10 }} name="search-outline" color={colorScheme === 'dark' ? 'white' : 'black'}></Ionicons>
                    <ThemedText style={styles.iconSelection}>Login</ThemedText>
                </Link>
            </ThemedView>
        </ThemedView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    desktopHidden: {
        display: width > 600 ? 'flex' : 'none',
        height: '50%',
        justifyContent: 'space-evenly'
    },
    desktopHiddenFullscreen: {
        display: width > 600 ? 'flex' : 'none',
    },
    desktopHiddenBorder: {
        display: width > 600 ? 'flex' : 'none',
        height: '50%',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: 'rgb(232,232,232)',
        borderRadius: 10,
        padding: 15
    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconSelection: {
        fontSize: 20
    },
});
