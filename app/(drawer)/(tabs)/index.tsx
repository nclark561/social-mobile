import {
  StyleSheet,
  Pressable,
  Button,
  useColorScheme,
  Text,
  Image,
  Dimensions,
  TextInput,
  Linking
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useContext, useCallback, useEffect } from "react";
import Animated from "react-native-reanimated";
import Post from "@/components/postComponents/Post";
import Header from "@/components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomBottomSheet from "@/components/util/CustomBottomSheet";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostContext from "@/components/providers/PostContext";
import MyContext from "@/components/providers/MyContext";
import { useFocusEffect, Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import DesktopRouting from "@/components/desktopComponents/desktopRouting";
import DesktopSuggestedProfiles from "@/components/desktopComponents/desktopSuggestedProfiles";
import StackLogos from "@/components/desktopComponents/stackLogos";
import Projects from "@/components/desktopComponents/projects";



export default function HomeScreen() {
  const newPostRef = useRef<BottomSheetModal>(null);
  const { width, height } = Dimensions.get('window');
  const [postInput, setPostInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const postContext = useContext<any>(PostContext);
  const { getUserPosts, forYouPosts, getForYouPosts, getBaseUrl } = postContext;
  const [profileImageUri, setProfileImageUri] = useState(``);
  const fadedTextColor = colorScheme === "dark" ? "#525252" : "#bebebe";
  const context = useContext<any>(MyContext);
  const { myInfo } = context;

  const handleOpenNewPost = () => newPostRef?.current?.present();
  const handleCloseNewPost = () => newPostRef?.current?.dismiss();

  const profileImage = (id: string) => {
    if (id) {
      const newProfileImageUri = `${process.env.EXPO_PUBLIC_SUPABASE_URL
        }/storage/v1/object/public/profile-images/${id}.jpg?${Date.now()}`;
      return newProfileImageUri;
    }
  };

  const createPost = async (content: string, userName: string) => {
    const userEmail = await AsyncStorage.getItem("user");
    try {
      const test = await fetch(`${getBaseUrl()}/api/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          email: userEmail,
          userName,
        }),
      });
      await getForYouPosts();
    } catch (error) {
      console.log(error, "this is the create post error");
    }
  };

  useEffect(() => {
    if (myInfo?.id) {
      const newProfileImageUri = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${myInfo.id}.jpg?${Date.now()}`;
      setProfileImageUri(newProfileImageUri);
    }
  }, [myInfo]);


  useFocusEffect(
    useCallback(() => {
      getUserPosts(myInfo?.email, myInfo?.id);
    }, [myInfo]),
  );

  useEffect(() => {
    getForYouPosts(myInfo?.id)
  }, [myInfo])

  const mortyUrl =
    "https://cdn.costumewall.com/wp-content/uploads/2017/01/morty-smith.jpg";
  const handleError = () => setProfileImageUri(mortyUrl);

  return (
    <ThemedView style={styles.pageContainer}>
      <ThemedView style={styles.desktopCenter}>
        {/* <Header name="Posts" /> */}
        <ThemedView style={styles.desktopRow}>      
          <ThemedView style={styles.postContainer}>
            <ThemedView style={styles.desktopHiddenFullscreen}>
              <ThemedView style={styles.row}>
                <Image
                  style={[styles.profilePic, { margin: 20 }]}
                  source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAMFBMVEXk5ueutLe+wsXn6eqrsbTU19nh4+S4vcDHy820ubzR1Nbc3+DAxcfM0NLq7O3Z3N2JvUspAAAENklEQVR4nO2c23LjIAxAbYursfH//+2CkybNHZAi0R2fh047+3JGI4MAaYfh4ODg4ODg4ODg4ODg4ODvAjAMJnH+tW+SYdjm1S0Zt85bGHp2Btjc5Ed1ZbTTGnqNM8Dqx1GNt6S//dyjMgSn7mWv0inM0oK3gHEPsb1R9mtXyRy1f6e7K9stSmv+AMPySXdXXjqJMYSP4f0JcpB2zcDndLgY+00+yKBLdXdl+dWiyjcZC8e4Lr4Zv4n6br7SN+WxERQ2xd/bb2O59ThO9b7J2EmlMcwtvgktYwymOoHPIbZCaVy0IT81lkmKrVE3G0uEGJq+uLPwIrBSbO2+Cf4QR4sS5i81Dcp39NyVJjiU76hm5hAbixSeeLMYNM535P7sYMWlcAqxZhU2zbvcRZh3nWgtI37DuncEbIBTiFkjXH0yeiLMeVYCRyC8MoYYU/hc4CyAgOCbGydG4UghbDmFCXxHz5jDkSCFD+H/S5jAd7Scwn9tWQNk+b7DunFQbM2stymtt2q/hVlv2HCXEidh1jOSQfuOirWAxx6a8xUm720V+qtjLYcRd9lXYearn4DdOrgvtWFCBtjx+jY80N3B/sAION+JWRd9WcV9eZnBfHactfAFxMrGfju8Y5ofDdQk8uwFc3OEhV70W8t4ueaftqVNWSHd1ocDyTaalqOSzApxofrpgL2IuKP24lWuu+NClbFapHWHKmPpfDhR/uUxH4teEuei5irlhXp9HoFQkBZqkW9jvJIOpZ+UuwnvCRicf91Srrzrrw0ewmqfKitlu2uBPwFmW9Sdc/rTbaZL3R2IYZ78+fDkvV9WE/u1PQExT8torTczxO5t8/gJxCvQ37d2IbsZneeQJmut9+nHNOVxJGM6086iQa+LPQ8h3X5zO35a9RZMD9NfEYJ2J9e321z6Zz+5eRtEszqtCc7m6a4Pm9x1ifN20SDToZ3y4HHVLdO22rAPJoHRrjiyT5yXmXXKLhpn3w53FSj7ZeNSBrM8zvk1OI+Wo4BLu9jzEqfNWX+5zADQC5nurvzdwcCcDJS6u7L92sUKmNdTnzjlr7x3wFA+N1drrBx9Kqds+Ep4z8pWE29/Ed/g/AHSdg/Atwt/RFm6cx8E3AhEofE4EwU5BvK17IUyzc0mQX9+sTHF+yisbL77sAQ2yJGgf6rG2CJ3avz4Q7UxKsbsvsg8Rrx1YoybQwxBwDevbq3rMcV0SZNx68sCxShBE23j8AIf3A9tr9HIkUSccUMakzRhtxtXl26CCbFT3W8utUJcqDyaUrRgo6id30e3VuKNqxZj6QzOVLW2IfsUSagZEER3gpJQ0cIdKcY08JS3RBO05BNQfiZlPca9obiUJ5n4JKC4aMPPPBBReEPf8N8jfQe1FmYEwaARCWop25572OZOlNYT0oXPlULhSfVC4dbhpl4oFIZuKPPtm3+Mgjt8yd+5mgAAAABJRU5ErkJggg==' }}
                  onError={handleError}
                />
                <TextInput onFocus={() => setIsFocused(false)}
                  onBlur={() => setIsFocused(false)} style={styles.input} placeholder="What's Happening!?"></TextInput>
              </ThemedView>
            </ThemedView>
            <Animated.ScrollView showsVerticalScrollIndicator={false}>
              {Array.isArray(forYouPosts) &&
                forYouPosts.map((post, i) => {
                  if (post.postId)
                    return (
                      <ThemedView style={{ flexDirection: "column" }}>
                        <ThemedView style={styles.row}>
                          <Ionicons name="git-compare-outline" size={15} />
                          <ThemedText style={styles.repost}>
                            {post.user.username} Reposted
                          </ThemedText>
                        </ThemedView>
                        <Post key={post.id} post={post.post} isComment={false} />
                      </ThemedView>
                    );
                  return <Post key={post.id} post={post} isComment={false} />;
                })}
            </Animated.ScrollView>
          </ThemedView>
        </ThemedView>
        <Pressable style={styles.addButton} onPress={handleOpenNewPost}>
          <Ionicons size={30} color={"white"} name="add" />
        </Pressable>
        <CustomBottomSheet hideCancelButton ref={newPostRef} snapPercs={["95%"]}>
          <ThemedView style={styles.commentContainer}>
            <ThemedView style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCloseNewPost}></Button>
              <Pressable
                onPress={() => {
                  createPost(postInput, myInfo.username);
                  handleCloseNewPost();
                }}
                style={styles.postButton}
              >
                <Text style={styles.buttonText}>Post</Text>
              </Pressable>
            </ThemedView>
            <ThemedView style={{ flexDirection: "row" }}>
              <Image
                style={styles.commentPic}
                source={{
                  uri: `${profileImage(myInfo?.id)}`,
                }}
              />
              <BottomSheetTextInput
                autoFocus
                onChangeText={(input) => setPostInput(input)}
                multiline
                placeholder="Type your post here"
                style={[
                  styles.postInput,
                  colorScheme === "dark"
                    ? { color: "#bebebe" }
                    : { color: "#525252" },
                ]}
              />
            </ThemedView>
          </ThemedView>
        </CustomBottomSheet>
      </ThemedView>
    </ThemedView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  addButton: {
    display: width > 600 ? 'none' : 'flex',
    position: "absolute",
    bottom: 90,
    right: 10,
    borderRadius: 25,
    height: 40,
    width: 40,
    backgroundColor: "#26a7de",
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "column",
    paddingTop: 20,
    height: 'auto',
    maxHeight: '90%',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  postButton: {
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#26a7de",
  },
  buttonText: {
    color: "white",
  },
  commentPic: {
    borderRadius: 25,
    width: 25,
    height: 25,
    margin: 10,
  },
  postInput: {
    maxWidth: "100%",
    paddingTop: 15,

  },
  repost: {
    fontSize: 12,

  },
  row: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    justifyContent: "space-evenly",
  },
  desktopRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  profilePic: {
    borderRadius: 15,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  desktopHidden: {
    display: width > 600 ? 'flex' : 'none',
    height: '50%',
    justifyContent: 'space-evenly'
  },
  desktopHiddenFullscreen: {
    display: width > 600 ? 'flex' : 'none',
  },

  desktopCenter: {
    width: width > 600 ? '80%' : '100%'
  },
  postContainer: {
    width: width > 600 ? '100%' : '100%'
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSelection: {
    fontSize: 20
  },
  input: {
    fontSize: 20,
    color: 'gray',
    padding: 10
  },
  sectionHeader: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCardText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  profileButton: {
    backgroundColor: 'rgb(38,102,193)', // LinkedIn Blue
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',

  }
});
