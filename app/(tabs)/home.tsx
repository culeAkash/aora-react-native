import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/loading";
import { Redirect } from "expo-router";
import { images } from "@/constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import VideoCard from "@/components/video-card";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { isLoading, isLoggedIn, user } = useAuth();
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  // // console.log(posts);
  // posts.forEach((post) => {
  //   console.log(post.creator);
  // });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO : fetch refreshed data from backend
    setRefreshing(false);
  };

  // console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !isLoggedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            // console.log(item.creator);
            return <VideoCard video={item} />;
          }}
          ListHeaderComponent={() => (
            <View className="my-4 px-4 space-x-4">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-zinc-200">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-zinc-200">
                    {user.username}
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />

              <View className="w-full flex-1 pt-10 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              description="Be the first one to upload a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
