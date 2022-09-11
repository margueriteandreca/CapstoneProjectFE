import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TokenContext } from "../App";

import UserProfileBio from "./UserProfileBio";
import UserProfileFeed from "./UserProfileFeed";

function ProfileScreen() {
  const [userProfile, setUserProfile] = useState({});
  const { token } = useContext(TokenContext);

  const fetchProfile = useCallback(() => {
    fetch(`http://127.0.0.1:8000/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`USER DATA`, data);
        setUserProfile(data);
      });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  useFocusEffect(fetchProfile);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userProfile.user && (
        <UserProfileBio
          userBio={userProfile.user}
          userPosts={userProfile.posts}
          isMe={true}
        />
      )}
      {userProfile.posts && (
        <UserProfileFeed userFeed={userProfile.posts} user={userProfile.user} />
      )}
    </View>
  );
}

export default ProfileScreen;
