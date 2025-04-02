import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import Footer from "../components/footer";

const Input = () => {
    const [taskName, setTaskName] = useState("");
    const [frequency, setFrequency] = useState("None");
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = () => {
        console.log("Task Submitted: ", taskName, "Frequency: ", frequency);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2s
    };

    const frequencyColors = {
        None: "bg-[#FFD700] text-black", // Yellow
        Daily: "bg-[#FFA500] text-black", // Orange
        Weekly: "bg-[#FF69B4] text-white", // Light Pink
        Monthly: "bg-[#FF00FF] text-white", // Magenta
    };

    return (
        <View className="flex flex-col items-center bg-neutral-950 w-screen min-h-screen h-max pt-4 px-4 text-neutral-50">
            <TouchableOpacity className="self-end items-center -mr-2">
                <Image source={require('../../assets/images/profile_icon.png')} className="w-5 h-9 object-cover" resizeMode="cover" />
                <Text className="text-base text-neutral-50 -mt-2">Profile</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/images/app-icon.png')} className="w-3/5 h-1/5 object-cover -mt-10" resizeMode="contain" />
            <Text className="text-4xl font-bold text-neutral-50 -mt-8">New Taskflow</Text>
            <View className="relative w-[88%] self-center mt-10">
                {/* Top Gradient Border
                <LinearGradient
                    colors={["#FFD700", "#E4A372", "#FF00FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                /> */}

                {/* Input Container */}
                <View className="bg-black p-4 rounded-xl flex-col gap-3 border border-neutral-700 shadow-lg shadow-yellow-500/10">
                    <TextInput
                        value={taskName}
                        onChangeText={setTaskName}
                        placeholder="What do you want to do?"
                        placeholderTextColor="white"
                        className="bg-black text-white text-base px-3 py-2 rounded-md w-full border border-neutral-700 focus:border-yellow-400"
                    />

                    {/* Frequency Selector */}
                    <View className="flex-row justify-between mt-2">
                        {["None", "Daily", "Weekly", "Monthly"].map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setFrequency(option)}
                                className={`px-4 py-2 rounded-md ${frequency === option ? frequencyColors[option] : "bg-neutral-950 text-neutral-50"
                                    }`}
                            >
                                <Text
                                    className={`${frequency === option ? "font-bold" : "text-neutral-50"
                                        } text-sm`}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Submit Button with Gradient */}
                    <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
                        <LinearGradient
                            colors={["#FFD700", "#E4A372", "#FF00FF"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="mt-3 py-2 rounded-md flex-row justify-center items-center overflow-hidden"
                        >
                            <Text className="text-black font-semibold">Create Task</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Bottom Gradient Glow */}
                <LinearGradient
                    colors={["#FFD700", "#E4A372", "#FF00FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute -bottom-1 left-0 w-full h-[5px] opacity-60 rounded-b-2xl overflow-hidden"
                />

                {/* Animated Popup */}
                <AnimatePresence>
                    {showPopup && (
                        <MotiView
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute top-[-60px] self-center bg-black px-6 py-3 rounded-lg border border-yellow-400"
                        >
                            <Text className="text-white text-center">✅ Task Created!</Text>
                        </MotiView>
                    )}
                </AnimatePresence>
            </View>
            <Text className="text-left text-neutral-50 text-base font-medium m-4 mx-6 mt-10">Describe any task that you want to break down into smaller, achievable quests. These could be as mundane as going to the gym, to long term goals like investing. Ensure to describe your goal briefly, as goals with the same name can cause confusions, like shooting - you can do that both with a gun, and a camera!</Text>
            <View className="absolute bottom-20 left-0 w-screen min-w-full h-20 bg-neutral-950 border-t border-neutral-800">
                <View className="flex-row justify-around items-center h-full">
                    {[
                        { label: "Home", iconSrc: require("../../assets/images/home_icon.png"), isCenter: false },
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
        </View>
    );
};

export default Input;
