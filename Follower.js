import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "./Context";
import ProfilePicture from "./Components/ProfilePicture";

function Follower({ id, username, avatar, isFollowing }) {
  const [currentlyFollowing, setCurrentlyFollowing] = useState(isFollowing);

  const { token } = useContext(TokenContext);

  const handleFollowUser = () => {
    fetch("http://127.0.0.1:8000/follow/", {
      method: "POST",
      body: JSON.stringify({
        following: id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentlyFollowing(true);
      });
  };

  return (
    <View style={followerStyles.container}>
      <View style={followerStyles.innerContainer}>
        <ProfilePicture avatar={avatar} />
        <Text style={followerStyles.usernameText}>{`@${username}`}</Text>
      </View>

      <TouchableOpacity
        style={followerStyles.buttonContainer}
        disabled={currentlyFollowing}
        onPress={handleFollowUser}
      >
        <Text style={followerStyles.followText}>
          {currentlyFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const followerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  buttonContainer: {
    marginRight: 15,
  },
  followText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9c7aff",
  },
});

export default Follower;
