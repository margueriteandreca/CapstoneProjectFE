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
} from "react-native";
import { TokenContext } from "../App";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TextUpload from "./TextUpload";
import ImageUpload from "./ImageUpload";

import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function UploadPostScreen() {
  const [postText, setPostText] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { navigate } = useNavigation();

  const { token } = useContext(TokenContext);

  const showDatePicker = () => {
    setIsOpen(true);
  };

  const hideDatePicker = () => {
    setIsOpen(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  const handleOpenScheduling = () => {
    navigate("ProfileStack", { screen: "Scheduling" });
  };

  const handleSaveDraft = () => {
    uploadPost(true);
  };

  const uploadPost = (isDraft = false) => {
    // let body = new FormData();
    // if (postImage) {
    //   body.append("image", {
    //     uri: postImage,
    //     name: "photo.png",
    //     filename: "imageName.png",
    //     type: "image/png",
    //   });
    // }
    // console.log("BODY", body);
    // if (postText) {
    //   body.append({ text: postText });
    // }

    const image = postImage ? { image: postImage } : {};
    const text = postText ? { text: postText } : {};
    const body = { ...image, ...text, is_draft: isDraft };

    console.log("!!! NEW POST", body);
    fetch("http://127.0.0.1:8000/new_post/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (isDraft) {
          navigate("Drafts");
        } else {
          navigate("Home", { screen: "ProfileStack" });
        }
      });
  };

  return (
    <View style={uploadStyles.container}>
      <View style={uploadStyles.postContainer}>
        <Tab.Navigator>
          <Tab.Screen
            name="Text"
            component={TextUpload}
            initialParams={{ setPostText }}
          />
          <Tab.Screen
            name="Image"
            component={ImageUpload}
            initialParams={{ setPostImage }}
          />
        </Tab.Navigator>
      </View>

      <View style={uploadStyles.schedulingContainer}>
        <View style={uploadStyles.uploadNow}>
          <TouchableOpacity>
            <Text style={uploadStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadPost}>
            <Text style={uploadStyles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={showDatePicker}
            style={uploadStyles.buttonContainer}
          >
            <Text style={uploadStyles.schedulingText}> Schedule Post</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSaveDraft}>
            <Text style={uploadStyles.draftsText}> Save to drafts</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isOpen}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
    </View>
  );
}

const uploadStyles = StyleSheet.create({
  container: {
    display: "flex",
    // justifyContent: "space-between",
  },
  postContainer: {
    backgroundColor: "purple",
    display: "flex",
    height: 420,
    width: "100%",
  },
  uploadNow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
    // marginTop: 10,
    width: "80%",
  },
  cancelText: {
    fontWeight: "500",
  },
  shareText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#3777f0",
  },
  schedulingContainer: {
    display: "flex",
    height: "45%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  schedulingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#3777f0",
    marginBottom: 10,
  },
  draftsText: {
    fontSize: 14,
    color: "#8367d6",
  },
});

export default UploadPostScreen;
