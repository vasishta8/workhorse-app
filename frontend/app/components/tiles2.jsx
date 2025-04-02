import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

const Tiles2 = ({ taskName, frequency }) => {
  return (
    <View className="relative w-[88%] self-center mb-4">
      {/* Soft Gradient Glow Behind Tile */}
      <View className="absolute -bottom-1 left-0 w-full h-[45px] opacity-60 rounded-b-2xl overflow-hidden">
        <LinearGradient
          colors={["#FFD700", "#E4A372", "#FF00FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-full"
        />
      </View>
      
      {/* Task Container */}
      <View className="bg-black p-4 rounded-xl flex-row items-center justify-between border border-neutral-700 shadow-lg shadow-yellow-500/10">
        <Text className="text-white text-base font-medium">{taskName}</Text>
        <Text className="text-gray-400 text-sm">{frequency}</Text>
      </View>
    </View>
  );
};

export default Tiles2;
