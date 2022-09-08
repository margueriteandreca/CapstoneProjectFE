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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import TextUpload from "./TextUpload";
import ImageUpload from "./ImageUpload";

import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function UploadPostScreen() {
  const [isText, setIsText] = useState(true);

  // const [image, setImage] = useState(null);

  const { navigate } = useNavigation();

  const handleOpenScheduling = () => {
    navigate("ProfileStack", { screen: "Scheduling" });
  };

  const UploadPost = () => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <View style={uploadStyles.container}>
      <View style={uploadStyles.postContainer}>
        <Tab.Navigator>
          <Tab.Screen name="Text" component={TextUpload} />
          <Tab.Screen name="Image" component={ImageUpload} />
        </Tab.Navigator>
      </View>

      <View style={uploadStyles.schedulingContainer}>
        <View style={uploadStyles.uploadNow}>
          <TouchableOpacity>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleOpenScheduling}
            style={uploadStyles.buttonContainer}
          >
            <Text style={uploadStyles.schedulingText}> Schedule Post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenScheduling}>
            <Text style={uploadStyles.draftsText}> Save to drafts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const uploadStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  postContainer: {
    backgroundColor: "purple",
    display: "flex",
    height: 400,
    width: "100%",
  },
  uploadNow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  schedulingContainer: {
    display: "flex",
    height: "40%",
    justifyContent: "space-evenly",
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
