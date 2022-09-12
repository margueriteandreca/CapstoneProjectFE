import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, createContext } from "react";
import * as SecureStore from "expo-secure-store";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import ScheduledPosts from "./ScheduledPosts";
import PostCardFull from "./Components/Posts/PostCardFull";
import HomeFeed from "./HomeFeed";
import UploadPostScreen from "./UploadPost/UploadPostScreen";
import Scheduling from "./UploadPost/Scheduling";
import EditProfile from "./UserProfile/EditProfile";
import LoginSignUp from "./LoginSignup/LoginSignUp";
import ProfileScreen from "./UserProfile/ProfileScreen";
import Header from "./Header";
import LogoutFooter from "./LogoutFooter";
import RepliesFull from "./Components/Posts/RepliesFull";
import PostCardFullScreen from "./Components/Posts/PostCardFullScreen";
import Drafts from "./Drafts";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const TokenContext = createContext({
  token: null,
  setToken: () => {},
});

export const UserContext = createContext({});

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
      <Stack.Screen
        name="RepliesFull"
        component={RepliesFull}
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
      <Stack.Screen
        name="RepliesFull"
        component={RepliesFull}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostCardFullScreen"
        component={PostCardFullScreen}
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
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

//LOG OUT CUSTOMER FOOTER
const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <DrawerContentScrollView {...props}>
        <Header />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <LogoutFooter />
    </View>
  );
};

// WHAT A LOGGED IN USER SEES
function LoggedInNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Scheduled Posts" component={ScheduledPosts} />
      <Drawer.Screen name="Drafts" component={Drafts} />
      <Drawer.Screen name="New Post" component={UploadPostScreen} />
    </Drawer.Navigator>
  );
}

// STACK FOR A SIGN IN AND LOG IN SCREEN
function LoggedOutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginSignup"
        component={LoginSignUp}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

const getToken = async (setToken, setIsLoading) => {
  try {
    const token = await SecureStore.getItemAsync("myToken");
    console.log("!!! GOT TOKEN:", token);
    if (token !== null) {
      setToken(token);
    } else {
      setIsLoading(false);
    }
  } catch (e) {
    console.log("ASYNC STORAGE ERROR", e);
  }
};

const deleteToken = async () => {
  console.log("!!! trying token");
  try {
    await SecureStore.deleteItemAsync("myToken");
    console.log("!!! delete stored token");
  } catch (e) {
    console.log("ASYNC STORAGE DELETE ERROR", e);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  // object used for TokenContext Provider
  const tokenValue = { token, setToken };

  //when app first loads, check if token exist, if exists, its logged in, show logged in nav
  useEffect(() => {
    getToken(setToken, setIsLoading);
  }, []);

  useEffect(() => {
    console.log(isLoading);
    if (token) {
      fetch(`http://127.0.0.1:8000/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setUserProfile(data);
          setIsLoggedIn(true);
        });
    } else if (!token && !isLoading) {
      setIsLoggedIn(false);
      deleteToken();
    }
  }, [token]);

  return (
    <TokenContext.Provider value={tokenValue}>
      <UserContext.Provider value={userProfile}>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name="LoggedIn"
                component={LoggedInNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="LoggedOut"
                component={LoggedOutNavigator}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
