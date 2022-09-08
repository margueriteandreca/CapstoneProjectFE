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
import { launchImageLibrary } from "react-native-image-picker";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
    <View style={imageUploadStyles.container}>
      <TouchableOpacity
        style={imageUploadStyles.buttonContainer}
        onPress={pickImage}
      >
        <Text style={imageUploadStyles.buttonText}>+</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: image }}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          bottom: "40%",
        }}
      />
    </View>
  );
}

const imageUploadStyles = StyleSheet.create({
  container: {
    width: 400,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default ImageUpload;
