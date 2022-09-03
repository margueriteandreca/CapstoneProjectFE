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
  //fetch PATCH here to users

  return (
    <View style={editProfileStyles.inputFormContainer}>
      <ProfilePicture isBig={true} />
      <View style={editProfileStyles.inputFormContainer}>
        <View>
          <Text>First Name</Text>
          <TextInput placeholder="First Name" />
        </View>
        <View>
          <Text>Last Name</Text>
          <TextInput placeholder="Last Name" />
        </View>
        <View>
          <Text>Bio</Text>
          <TextInput placeholder="Bio" />
        </View>
        <View>
          <Text>Link</Text>
          <TextInput placeholder="insert link" />
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
  inputFormContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default EditProfile;
