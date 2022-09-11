import React from "react";
import { useState, useEffect } from "react";
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
import { useRoute } from "@react-navigation/native";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [isShowingPicker, setIsShowingPicker] = useState(true);
  const { params } = useRoute();

  useEffect(() => {
    params.setPostImage(image);
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("!!! RESUTL", result);
      setImage(result.uri);
      setIsShowingPicker(false);
    }
  };

  console.log(image);

  return (
    <View style={imageUploadStyles.container}>
      {isShowingPicker ? (
        <TouchableOpacity
          style={imageUploadStyles.buttonContainer}
          onPress={pickImage}
        >
          <Text style={imageUploadStyles.buttonText}>+</Text>
        </TouchableOpacity>
      ) : (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            position: "absolute",
            backgroundColor: "red",
          }}
        />
      )}
    </View>
  );
}

const imageUploadStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 420,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
    // opacity: 0.2,
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
