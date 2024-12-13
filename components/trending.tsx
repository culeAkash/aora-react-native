import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  Button,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { VideoModel } from "@/utils/types";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0.9,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },

  1: {
    opacity: 1,
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
  const [play, setPlay] = useState(false);
  // console.log(item.video);
  const videoSource = item.video;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: VideoModel[];
}

const Trending = ({ posts }: TrendingProps) => {
  // console.log(posts);
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
      // console.log(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem.$id} item={item} />
      )}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      onViewableItemsChanged={viewableItemsChanged}
      contentOffset={{ x: 150, y: 0 }}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  video: {
    width: 208,
    height: 288,
    marginVertical: 20,
    borderRadius: 35,
  },
});
