import React from "react";
import { useState } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ProfilePicture from "../Components/ProfilePicture";

function EditProfile() {
  //user will be passed down to populate placeholder info
  //fetch PATCH here to users

  return (
    <View style={editProfileStyles.inputFormContainer}>
      <ProfilePicture isBig={true} />
      <TouchableOpacity style={editProfileStyles.buttonContainer}>
        <Text style={editProfileStyles.buttonText}>Change profile photo</Text>
      </TouchableOpacity>
      <View style={editProfileStyles.inputFormContainer}>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Bio</Text>
          <TextInput
            placeholder="Bio"
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Link</Text>
          <TextInput
            placeholder="insert link"
            style={editProfileStyles.inputContainer}
          />
        </View>
      </View>
    </View>
  );
}

const editProfileStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    margin: 5,
  },
  buttonText: {
    color: "#9c7aff",
    fontWeight: "bold",
  },
  inputFormContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputLabelWrapper: {
    // backgroundColor: "purple",
    width: 390,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputContainer: {
    height: 50,
    width: 250,
    // backgroundColor: "red",
  },
});

export default EditProfile;
