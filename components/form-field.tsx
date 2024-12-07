import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  label: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyBoardType?: string;
  placeholder?: string;
}

const FormField = ({
  label,
  value,
  handleChangeText,
  keyBoardType,
  otherStyles,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`gap-y-2 ${otherStyles}`}>
      <Text className="text-base text-zinc-200 font-pmedium">{label}</Text>
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-200 items-center flex-row">
        <TextInput
          className="flex-1 text-zinc-200 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={keyBoardType === "password" && !showPassword}
        />
        {keyBoardType === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
