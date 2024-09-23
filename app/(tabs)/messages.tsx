import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from 'moti'; // Use Moti for animations
import Test from "../MessageComponents/Test"; // Ensure this component is adapted for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "@/components/providers/MyContext";
import { router } from "expo-router";

interface MessageData {
  conversationId: string;
  date: string; // Use string because date is usually a string from an API
  id: string;
  message: string;
  status: string;
  userName: string;
  recipient?: string;
}

const MessageHome: React.FC = () => {
  const [messageData, setMessageData] = useState<MessageData[]>([]);
  const [myConvos, setMyConvos] = useState<any[]>([]);
  const navigation = useNavigation();
  const context = useContext<any>(MyContext);
  const { setLoginToggle, myInfo, loggedIn } = context;

  useEffect(() => {
    getConvos();
    const intervalId = setInterval(getConvos, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getConvos = async () => {
    try {
      const convos = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/api/getConvos?email=${myInfo.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const userInfo = await convos.json();
      setMyConvos([...userInfo.Posts]);
    } catch (error) {
      console.log(error, "this is the create user error");
    }
  };

  const getConvoData = async () => {
    try {
      const result = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/api/getConvoData?ids=${myConvos?.map((convo) => convo.id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const allData = await result.json();
      setMessageData(allData.Posts);
    } catch (error) {
      console.log(error, "this is an error");
    }
  };

  useEffect(() => {
    getConvoData();
  }, [myConvos]);

  
  

  const renderItem = ({ item }: { item: MessageData }) => {
    const lastMessageDate = new Date(item.date);
    let hours = lastMessageDate.getHours();
    const minutes = String(lastMessageDate.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const time = `${hours}:${minutes} ${ampm}`;

    return (
      <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Test
          key={item.conversationId}
          time={time}
          conversationId={item.conversationId}
          message={item.message}
          status={item.status}
          userName={item.userName}
          recipient={item.recipient}
        />
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{myInfo?.username}</Text>
      </View>
      <FlatList
        data={messageData}
        keyExtractor={(item) => item.conversationId}
        renderItem={renderItem}
      />
      <View style={styles.center}>
        <Text>Create A Conversation</Text>
        <TouchableOpacity onPress={() => router.navigate("/MessageComponents/newChat")}>
          <Ionicons name="add-circle-outline" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default MessageHome;
