import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import "nativewind";
import Footer from "../components/footer";

const Profile = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <View className="flex flex-col items-center bg-neutral-950 w-screen min-h-screen h-max pt-4 px-4 text-neutral-50">
            {/* Profile Icon */}
            <TouchableOpacity className="self-end items-center -mr-2">
                <Image source={require("../../assets/images/profile_icon.png")} className="w-5 h-9 object-cover" resizeMode="cover" />
                <Text className="text-base text-neutral-50 -mt-2">Profile</Text>
            </TouchableOpacity>

            {/* Logo */}
            <Image
                source={require("../../assets/images/app-icon.png")}
                className="w-3/5 h-1/5 object-cover -mt-10"
                resizeMode="contain"
            />

            {/* Profile Section Centered */}
            <View className="flex flex-col items-center justify-top flex-grow mt-6">
                {/* Profile Picture */}
                <TouchableOpacity onPress={pickImage} className="mb-4">
                    <Image
                        source={
                            profileImage
                                ? { uri: profileImage }
                                : require("../../assets/images/default-profile.png")
                        }
                        className="w-32 h-32 rounded-full border border-neutral-700"
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                {/* User Info */}
                <Text className="text-2xl text-neutral-50 mt-2">JohnDoe</Text>
                <Text className="text-lg text-neutral-400 mt-1">johndoe@example.com</Text>
                <Text className="text-lg text-neutral-400 mt-1">Total Exp: 1500</Text>

                {/* Sign Out Button with Gradient */}
                <TouchableOpacity onPress={() => navigation.navigate("Login")} className="mt-6 rounded-xl overflow-hidden">
                    <LinearGradient
                        colors={["#FFD700", "#E4A372", "#FF00FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-8 py-3 rounded-xl"
                    >
                        <Text className="text-white text-lg text-center">Sign Out</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
};

export default Profile;