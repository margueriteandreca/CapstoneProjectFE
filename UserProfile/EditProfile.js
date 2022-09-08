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

///MUST ADD GOBACK

function EditProfile({ route, navigation }) {
  const { userBio } = route.params;
  console.log(userBio);

  const [image, setImage] = useState(userBio.avatar);

  const handleUpdateBio = () => {
    fetch().then().then();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={editProfileStyles.inputFormContainer}>
      <ProfilePicture isBig={true} avatar={image} />
      <TouchableOpacity
        style={editProfileStyles.buttonContainer}
        onPress={pickImage}
      >
        <Text style={editProfileStyles.buttonText}>Change profile photo</Text>
      </TouchableOpacity>
      <View style={editProfileStyles.inputFormContainer}>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            defaultValue={userBio.first_name}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            defaultValue={userBio.last_name}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Bio</Text>
          <TextInput
            placeholder="Bio"
            defaultValue={userBio.bio}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Link</Text>
          <TextInput
            placeholder="insert link"
            defaultValue={userBio.bio_link}
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
