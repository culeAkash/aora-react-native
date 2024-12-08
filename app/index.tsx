import { router, Redirect } from "expo-router";
import {
  Image,
  ScrollView,
  View,
  Text,
  GestureResponderEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/custom-button";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context-provider";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/loading";

export default function Index() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  }

  const handlePress = (event: GestureResponderEvent) => {
    event.preventDefault();
    router.push("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w--[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-4xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[70px] h-[15px] absolute -bottom-1 -right-[0.5]"
            />
          </View>
          <Text className="text-sm font-pregular text-zinc-200 mt-7 text-center">
            Where creativity meets innovation. Embark on a journey of endless
            possibilities with Aora
          </Text>
          <CustomButton
            title="Continue with email"
            onPress={handlePress}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
