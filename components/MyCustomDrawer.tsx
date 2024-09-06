// components/MyCustomDrawer.js
import React, { useContext } from 'react';
import { StyleSheet, Image, Button, View, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ThemedText } from './ThemedText';
import { supabase } from './Supabase';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from './providers/MyContext';


export default function MyCustomDrawer(props: any) {
    const context = useContext<any>(MyContext);
    const { setLoginToggle, myInfo } = context
    // const router = useRouter();
    
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            await AsyncStorage.removeItem('user');
            if (error) {
                console.log("this is logout error", error);
            }
            router.navigate('/login')
            setLoginToggle(false)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.header}>
                {myInfo ? <Image style={styles.profilePic} source={{ uri: 'https://cdn.costumewall.com/wp-content/uploads/2017/01/morty-smith.jpg' }} /> : <Pressable onPress={() => { router.navigate('/login') }}><ThemedText>Login</ThemedText></Pressable>}
                <ThemedText style={styles.headerText}>{myInfo?.username}</ThemedText>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                {myInfo ? <Button title="Logout" onPress={() => handleLogout()} /> : <></>}

            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-around',
        alignItems: 'baseline',
        height: "18%",
        padding: 15
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profilePic: {
        borderRadius: 15,
        width: 35,
        height: 35,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});