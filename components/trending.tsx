import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { VideoModel } from "@/utils/types";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: VideoModel;
}) => {
  return <Animatable.View className="mr-5" animation={}></Animatable.View>;
};

interface TrendingProps {
  posts: VideoModel[];
}

const Trending = ({ posts }: TrendingProps) => {
  // console.log(posts);
  const [activeItem, setActiveItem] = useState(posts[0]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem.$id} item={item} />
      )}
      horizontal
    />
  );
};

export default Trending;
