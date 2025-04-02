import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Tiles2 from '../components/tiles2.jsx';
import Footer from '../components/footer.jsx';
import "nativewind";

const taskGroups = [
    { 
        title: "Gym", 
        tasks: [
            { name: "Leg Day", frequency: "Weekly" },
            { name: "Arms Day", frequency: "Weekly" },
            { name: "Cardio", frequency: "Daily" }
        ]
    },
    {
        title: "Work",
        tasks: [
            { name: "Meeting", frequency: "Daily" },
            { name: "Report Writing", frequency: "Weekly" }
        ]
    },
    {
        title: "Chores",
        tasks: [
            { name: "Laundry", frequency: "Weekly" },
            { name: "Dishes", frequency: "Daily" }
        ]
    }
];

const Tasks = () => {
    const [expandedGroups, setExpandedGroups] = useState({});

    const toggleGroup = (title) => {
        setExpandedGroups(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <View className="flex flex-col items-center bg-neutral-950 w-screen min-h-screen h-max pt-4 px-4 text-neutral-50">
            <TouchableOpacity className="self-end items-center -mr-2">
                <Image source={require('../../assets/images/profile_icon.png')} className="w-5 h-9 object-cover" resizeMode="cover" />
                <Text className="text-base text-neutral-50 -mt-2">Profile</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/images/app-icon.png')} className="w-3/5 h-1/5 object-cover -mt-10" resizeMode="contain" />

            <View className="w-full px-4 gap-2 mt-4 flex flex-col justify-start">
                {taskGroups.map(group => (
                    <View key={group.title} className="mb-4">
                        <TouchableOpacity onPress={() => toggleGroup(group.title)} className="bg-neutral-800 p-3 rounded-lg border-neutral-50 border-[1px] flex-row items-center justify-between">
                            <Text className="text-xl text-bold text-neutral-50">{group.title}</Text>
                        </TouchableOpacity>
                        {expandedGroups[group.title] && (
                            <View className="mt-2">
                                {group.tasks.map((task, index) => (
                                    <Tiles2 key={index} taskName={task.name} frequency={task.frequency} />
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
            
            <Footer />
        </View>
    );
};

export default Tasks;
