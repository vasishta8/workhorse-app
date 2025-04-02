import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

const CompletedTiles = () => {
  return (
    <View className="relative w-[88%] self-center mb-4">
      {/* Top Gradient Border */}
      <View className="absolute -bottom-1 left-0 w-full h-[45px] opacity-60 rounded-b-2xl overflow-hidden">
        <LinearGradient
          colors={["#FFD700", "#E4A372", "#FF00FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-full"
        />
      </View>

      {/* Task Container */}
      <View className="bg-black p-4 rounded-xl flex-row items-center gap-3 border border-neutral-700 shadow-lg shadow-yellow-500/10">
        <Text className="text-white text-base font-medium line-through text-neutral-500">Task Name</Text>
      </View>
    </View>
  );
};

export default CompletedTiles;