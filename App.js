import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import UserProfileBio from "./UserProfile/UserProfileBio";
import UserProfileFeed from "./UserProfile/UserProfileFeed";
import ScheduledPosts from "./ScheduledPosts";
import PostCardFull from "./PostCardFull";
import HomeFeed from "./HomeFeed";
import UploadPostScreen from "./UploadPost/UploadPostScreen";
import Scheduling from "./UploadPost/Scheduling";
import EditProfile from "./UserProfile/EditProfile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = ({ route }) => ({
  // THESE ARE THE CONFIGS OF HOW BOTTOM TABS SHOW
  tabBarIcon: ({ focused, color, size }) => {
    switch (route.name) {
      case "HomeStack":
        return <Entypo name="home" size={24} color="black" />;
      case "ProfileStack":
        return <FontAwesome name="user-circle-o" size={24} color="black" />;
      default:
        return <Image />;
    }
  },
  tabBarActiveTintColor: "#3872E9",
  tabBarInactiveTintColor: "gray",
  tabBarShowLabel: false,
});

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <UserProfileBio />
      <UserProfileFeed />
    </View>
  );
}

function HomeScreen() {
  return <HomeFeed />;
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostCardFull"
        component={PostCardFull}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scheduling"
        component={Scheduling}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// BOTTOM TABS
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// WHAT A LOGGED IN USER SEES
function LoggedInNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Scheduled Posts" component={ScheduledPosts} />
      <Drawer.Screen name="New Post" component={UploadPostScreen} />
    </Drawer.Navigator>
  );
}

// MOVE THESE SCREENS TO NEW FILES
function LogInScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Log In Here!</Text>
    </View>
  );
}

function SignUpScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Sign Up here!</Text>
    </View>
  );
}

// STACK FOR A SIGN IN AND LOG IN SCREEN
function LoggedOutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const storeLogin = async (token) => {
  try {
    await SecureStore.setItemAsync("myToken", token);
  } catch (e) {
    console.log("ASYNC STORAGE SET ERROR", e);
  }
};

const getLogin = async (setToken, setIsLoading) => {
  try {
    const token = await SecureStore.getItemAsync("myToken");
    if (token !== null) {
      setToken(token);
    } else {
      setIsLoading(false);
    }
  } catch (e) {
    console.log("ASYNC STORAGE ERROR", e);
  }
};

////////////////////////////////////////////////////////////////

function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);

  useEffect(() => {
    fetch()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedPhotos(data);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoggedIn"
          component={LoggedInNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoggedOut"
          component={LoggedOutNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
