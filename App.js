import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import UserProfileBio from "./UserProfile/UserProfileBio";
import UserProfileFeed from "./UserProfile/UserProfileFeed";
import ScheduledPosts from "./ScheduledPosts";
import PostCardFull from "./PostCardFull";

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This will be my FEED</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

//WHERE A USER LANDS ON OPENING THE APP

function App() {
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
