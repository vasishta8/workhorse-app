import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const Footer = () => {
  return (
    <View className="absolute bottom-20 left-0 w-screen min-w-full h-20 bg-neutral-950 border-t border-neutral-800">
      <View className="flex-row justify-around items-center h-full">
        {[
          { label: "Home", iconSrc: require("../../assets/images/home_icon.png"), isCenter: false },
          { label: "", iconSrc: require("../../assets/images/plus-icon.png"), isCenter: true },
          { label: "Tasks", iconSrc: require("../../assets/images/task_icon.png"), isCenter: false },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex items-center justify-center p-2 pb-4 ${item.isCenter ? "scale-150 rounded-full p-3 shadow-lg" : ""
              }`}
          >
            <Image
              source={item.iconSrc}
              className={`${item.isCenter ? "w-14 h-14" : "w-6 h-6"} mb-1`}
            />
            {item.label !== "" && (
              <Text className="text-sm text-gray-500 dark:text-gray-400">{item.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Footer;
