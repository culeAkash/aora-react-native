import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
  return (
    <SafeAreaView className="h-full w-full justify-center items-center bg-primary">
      <Text className="text-2xl font-psemibold text-zinc-200">loading...</Text>
    </SafeAreaView>
  );
};

export default Loading;
