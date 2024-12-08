import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/loading";
import { Redirect } from "expo-router";
import { images } from "@/constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";

const Home = () => {
  const { isLoading, isLoggedIn, user } = useAuth();
  // console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !isLoggedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <>
      <SafeAreaView className="bg-primary">
        <FlatList
          data={[]}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text className="text-3xl text-zinc-200">{item?.id}</Text>
            </View>
          )}
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
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View>
              <Text className="text-3xl text-zinc-200">No videos yet</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
