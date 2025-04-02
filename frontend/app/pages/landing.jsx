import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import '../../../global.css';
import "nativewind";

const Landing = () => {
  const handlePress = () => {
    console.log("Button pressed!");
    // Add your navigation or authentication logic here
  };

  return (
    <View className="flex flex-col items-center bg-neutral-950 w-screen min-h-screen h-max pt-4 px-1 text-neutral-50">
      <Image source={require('../../assets/images/landing-image.png')} className="w-full h-1/2 object-cover rounded-[20]" resizeMode="cover"/>
      <Image source={require('../../assets/images/app-icon.png')} className="w-3/5 h-1/5 object-cover -mt-10" resizeMode="contain"/>
      <Text className="text-3xl font-bold text-neutral-50 text-start -mt-9">Level up in Real Life</Text>
      <Text className="text-xl font-normal text-neutral-50 text-center">Set any goal of your choice, and we'll break it down into a flow of achievable quests. Are you ready to begin?</Text>
      <TouchableOpacity 
        className="flex flex-row items-center justify-center text-2xl bg-neutral-50 px-8 py-3 rounded-[400] mt-10"
        onPress={handlePress}
      >
        <Text className="text-neutral-950 text-2xl font-medium">Get Started with </Text>
        <Image source={require('../../assets/images/google-icon.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
        <Text className="text-neutral-950 text-2xl font-medium">Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;
