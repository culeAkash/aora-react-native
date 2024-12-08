import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingProps {
  posts: { id: number }[];
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text className="text-3xl text-zinc-200">{item.id}</Text>
        </View>
      )}
      horizontal
    />
  );
};

export default Trending;
