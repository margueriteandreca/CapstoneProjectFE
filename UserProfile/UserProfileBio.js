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
import ProfilePicture from "../Components/ProfilePicture";
import Followers from "./Followers";

function UserProfileBio({ userBio, userPosts, isMe }) {
  const { navigate } = useNavigation();

  const handleOpenEditProfile = () => {
    navigate("EditProfile", {
      userBio,
    });
  };

  return (
    <View style={userBioStyles.container}>
      <View style={userBioStyles.photoFollowersContainer}>
        <ProfilePicture isBig={true} avatar={userBio.avatar} />
        <Followers posts={userPosts} following={userBio.following} />
      </View>
      <View style={userBioStyles.bioContainer}>
        <View style={userBioStyles.bioInnerContainer}>
          <Text>{`${userBio.bio} •`}</Text>
          <Text>{`${userBio.bio_link}`}</Text>
        </View>
        {isMe && (
          <TouchableOpacity
            onPress={handleOpenEditProfile}
            style={userBioStyles.buttonContainer}
          >
            <Text style={userBioStyles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const userBioStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "40%",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3777f0",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  photoFollowersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "aqua",
  },
  bioContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bioInnerContainer: {
    // backgroundColor: "aqua",
    height: 60,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfileBio;
