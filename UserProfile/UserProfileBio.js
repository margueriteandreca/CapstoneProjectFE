import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ProfilePicture from "../Components/ProfilePicture";
import Followers from "./Followers";

function UserProfileBio() {
  return (
    <View style={userBioStyles.container}>
      <View style={userBioStyles.photoFollowersContainer}>
        <ProfilePicture />
        <Followers />
      </View>
      <View style={userBioStyles.bioContainer}>
        <View style={userBioStyles.bioInnerContainer}>
          <Text>This is the Bio</Text>
        </View>
        <TouchableOpacity style={userBioStyles.buttonContainer}>
          <Text style={userBioStyles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
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
    // backgroundColor: "purple",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
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
