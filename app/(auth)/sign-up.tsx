import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link } from "expo-router";

type formStateType = {
  email: string;
  password: string;
  username: string;
};

const SignUp = () => {
  const [formState, setFormState] = useState<formStateType>({
    email: "",
    password: "",
    username: "",
  });

  const onSubmit = () => {
    // Perform sign-in logic here
    console.log("Sign-in form submitted with values:", formState);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-zinc-200 font-psemibold mt-10 text-semibold">
            SignUp to Aora
          </Text>
          <FormField
            label="Username"
            value={formState.username}
            handleChangeText={(e) => {
              setFormState({ ...formState, username: e });
            }}
            otherStyles="mt-7"
            keyBoardType="username"
            placeholder="Enter your username"
          />
          <FormField
            label="Email"
            value={formState.email}
            handleChangeText={(e) => {
              setFormState({ ...formState, email: e });
            }}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder="Enter your email address"
          />
          <FormField
            label="Password"
            value={formState.password}
            handleChangeText={(e) => {
              setFormState({ ...formState, password: e });
            }}
            otherStyles="mt-7"
            keyBoardType="password"
            placeholder="Enter your password"
          />

          <CustomButton
            title="Sign Up"
            onPress={onSubmit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className="justify-center  pt-5 flex-row gap-2">
            <Text className="text-lg text-zinc-200 font-pregular">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
