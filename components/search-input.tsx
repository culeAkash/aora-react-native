import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  value?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
}

const SearchInput = ({
  value,
  handleChangeText,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-200 items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-zinc-200 flex-1 font-pregular"
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
