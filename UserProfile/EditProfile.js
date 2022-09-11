import React from "react";
import { useState, useContext } from "react";
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
import { TokenContext } from "../App";

///MUST ADD GOBACK

function EditProfile({ route, navigation }) {
  const { token } = useContext(TokenContext);

  const { userBio } = route.params;
  console.log(userBio);

  const [firstName, setFirstName] = useState(userBio.first_name);
  const [lastName, setLastName] = useState(userBio.last_name);
  const [bio, setBio] = useState(userBio.bio);
  const [bioLink, setBioLink] = useState(userBio.bio_link);

  const [image, setImage] = useState(userBio.avatar);

  const handleUpdateBio = () => {
    fetch("http://127.0.0.1:8000/profile/edit/", {
      method: "PATCH",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        bio,
        bio_link: bioLink,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("profile patch:", data);
      })
      .catch((e) => console.log("patch error:", e));
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
            value={firstName}
            onChangeText={setFirstName}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            defaultValue={userBio.last_name}
            value={lastName}
            onChangeText={setLastName}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Bio</Text>
          <TextInput
            placeholder="Bio"
            defaultValue={userBio.bio}
            value={bio}
            onChangeText={setBio}
            style={editProfileStyles.inputContainer}
          />
        </View>
        <View style={editProfileStyles.inputLabelWrapper}>
          <Text>Link</Text>
          <TextInput
            placeholder="insert link"
            defaultValue={userBio.bio_link}
            value={bioLink}
            onChangeText={setBioLink}
            style={editProfileStyles.inputContainer}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleUpdateBio}
        style={editProfileStyles.saveContainer}
      >
        <Text style={editProfileStyles.saveText}>Save changes</Text>
      </TouchableOpacity>
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
  saveContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "indigo",
  },
  saveText: {
    color: "white",
    fontSize: 16,
  },
});

export default EditProfile;
