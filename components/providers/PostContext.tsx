import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../components/Supabase";
import { Platform } from "react-native";

type PostContextType = {
  getUserPosts: (email: string, userId: string) => Promise<void>;
  getForYouPosts: () => Promise<void>;
  posts: any;
  forYouPosts: any[];
  forYouPostsToggle: boolean;
  setForYouPostsToggle: (value: boolean) => void;
  getBaseUrl: () => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [forYouPosts, setForYouPosts] = useState<any[]>([]);
  const [forYouPostsToggle, setForYouPostsToggle] = useState<boolean>(false);

  const getBaseUrl = () => {
    if (Platform.OS === "web") {
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        return process.env.EXPO_PUBLIC_LOCAL_SERVER_BASE_URL; // local
      } else {
        // Prod for web
        return process.env.EXPO_PUBLIC_PROD_SERVER_BASE_URL; // Use production env variable
      }
    } else {
      // (iOS/Android)
      return process.env.EXPO_PUBLIC_SERVER_BASE_URL;
    }
  };

  useEffect(() => {
    getForYouPosts();
  }, [forYouPostsToggle]);

  const getUserPosts = async (email: string, userId: string) => {
    try {
      const result = await fetch(
        `${getBaseUrl()}/api/getMyPosts?email=${email}&id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const fetchedPosts = await result.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error, "this is the get user error");
    }
  };

  const getForYouPosts = async (userId?: string) => {
    try {
      const result = await fetch(`${getBaseUrl()}/api/getPosts${userId ? `?id=${userId}` : ''}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchedPosts = await result.json();
      // console.log(JSON.stringify(fetchedPosts, null, 2));
      setForYouPosts(fetchedPosts.Posts);
    } catch (error) {
      console.log(error, "this is the get for you posts error");
    }
  };

  return (
    <PostContext.Provider
      value={{
        getUserPosts,
        posts,
        getForYouPosts,
        forYouPosts,
        forYouPostsToggle,
        setForYouPostsToggle,
        getBaseUrl,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
