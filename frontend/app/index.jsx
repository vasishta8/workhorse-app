import { Text, View, SafeAreaView } from "react-native";
import Landing from "./pages/landing.jsx";
import Home from "./pages/home.jsx";
import Test from "./pages/test.jsx";
import Input from "./pages/input.jsx";
import Tasks from "./pages/tasks.jsx";
import Profile from "./pages/profile.jsx";
import Footer from "./components/footer.jsx";
import Tiles from "./components/tiles.jsx";
import Tiles2 from "./components/tiles2.jsx";
import { StatusBar } from "expo-status-bar";
import "../global.css"

export default function Index() {
  const renderTiles = (n) => {
    return Array.from({ length: n }, (_, index) => <Tiles key={index} />);
  };

  return (
    <View className="flex flex-col flex-1 justify-start bg-neutral-950 w-screen min-h-screen h-max text-neutral-50">
      <Input />
    </View>
  );
}
