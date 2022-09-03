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

function UploadPostScreen() {
  const [isText, setIsText] = useState(true);

  const { navigate } = useNavigation();

  const handleOpenScheduling = () => {
    navigate("Scheduling");
  };

  return (
    <View style={uploadStyles.container}>
      <View style={uploadStyles.postContainer}>
        {isText ? <TextUpload /> : <ImageUpload />}
      </View>

      <TouchableOpacity onPress={handleOpenScheduling}>
        <Text> SCHEDULE </Text>
      </TouchableOpacity>
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
});

export default UploadPostScreen;
