import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-psemibold text-zinc-200">{title}</Text>
      <Text className="font-pmedium text-sm text-zinc-200">{description}</Text>
      <CustomButton
        title="Create Video"
        onPress={() => {
          router.push("/create");
        }}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
