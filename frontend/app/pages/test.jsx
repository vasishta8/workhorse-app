import React from "react";
import { Text, View } from "react-native";

const Test = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Shadow Layer */}
      <Text className="absolute text-4xl font-bold text-gray-500 left-1 top-1">
        Shadow Effect
      </Text>
      {/* Main Text Layer */}
      <Text className="text-4xl font-bold text-black">Shadow Effect</Text>
    </View>
  );
};

export default Test;
