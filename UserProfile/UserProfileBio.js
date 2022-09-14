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

        <Followers
          posts={userPosts}
          following={userBio.following}
          followers={userBio.followers}
          first_name={userBio.first_name}
          last_name={userBio.last_name}
          username={userBio.username}
        />
      </View>
      <View style={userBioStyles.bioContainer}>
        <View style={userBioStyles.nameContainer}>
          <View style={userBioStyles.firstLastContainer}>
            <Text
              style={userBioStyles.nameText}
            >{`${userBio.first_name} `}</Text>
            <Text style={userBioStyles.nameText}>{userBio.last_name}</Text>
          </View>
          <Text> • </Text>
          <Text>{`@${userBio.username}`}</Text>
        </View>
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
    height: "35%",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#665EC2",
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
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bioInnerContainer: {
    // backgroundColor: "aqua",
    // height: 60,
    marginBottom: 10,
    width: 300,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "80%",
    marginBottom: 10,
  },
  firstLastContainer: {
    display: "flex",
    flexDirection: "row",
  },

  nameText: {
    fontWeight: "700",
  },
});

export default UserProfileBio;
