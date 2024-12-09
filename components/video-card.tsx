import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { VideoModel } from "@/utils/types";
import { icons } from "@/constants";

const VideoCard = ({
  video: {
    $id,
    prompt,
    thumbnail,
    title,
    video,
    creator: { username, avatar },
  },
}: {
  video: VideoModel;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 my-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-zinc-200"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-zinc-200 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Text className="text-2xl font-psemibold text-zinc-200">Playing</Text>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
