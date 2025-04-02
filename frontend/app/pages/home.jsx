import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Tiles from '../components/tiles.jsx';
import CompletedTiles from '../components/completedtiles.jsx';
import Footer from '../components/footer.jsx';
import "nativewind";

const Home = () => {
    const username = "Venkat";
    return (
        <View className="flex flex-col items-center bg-neutral-950 w-screen min-h-screen h-max pt-4 px-4 text-neutral-50">
            <TouchableOpacity className="self-end items-center -mr-2">
                <Image source={require('../../assets/images/profile_icon.png')} className="w-5 h-9 object-cover" resizeMode="cover" />
                <Text className="text-base text-neutral-50 -mt-2">Profile</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/images/app-icon.png')} className="w-3/5 h-1/5 object-cover -mt-10" resizeMode="contain" />
            <Text className="text-4xl font-bold text-neutral-50 -mt-8">Welcome, {username}</Text>

            <View className="w-full px-4 gap-2 mt-4 flex flex-col justify-start">
                <Text className="text-2xl text-neutral-50 mt-4">Pending Tasks</Text>
                <Tiles />
                <Tiles />
                <Tiles />
                <Text className="text-2xl text-neutral-50 mt-4">Completed Tasks</Text>
                <CompletedTiles />
            </View>



            <Footer />
        </View>
    );
};

export default Home;
