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

  const { navigate } = useNavigation();

  const handleOpenScheduling = () => {
    navigate("Scheduling");
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
  schedulingContainer: {
    display: "flex",
    justifyContent: "center",
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
    backgroundColor: "green",
  },
  draftsText: {
    fontSize: 14,
    color: "#8367d6",
  },
});

export default UploadPostScreen;
