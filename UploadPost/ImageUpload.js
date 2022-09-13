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
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("!!! RESUTL", result);
      setImage(result);
      setIsShowingPicker(false);
    }
  };

  console.log(image);

  return (
    <>
      <View style={imageUploadStyles.container}>
        <Text style={imageUploadStyles.text}>Upload an image</Text>
        <View style={imageUploadStyles.innerContainer}>
          {isShowingPicker ? (
            <TouchableOpacity
              style={imageUploadStyles.buttonContainer}
              onPress={pickImage}
            >
              <Text style={imageUploadStyles.buttonText}>+</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                shadowColor: "black",
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 16.27,
                elevation: 1,
                width: 250,
                height: 250,
                position: "absolute",
              }}
            >
              <Image
                source={{ uri: image.uri }}
                style={{
                  width: 250,
                  height: 250,
                  position: "absolute",
                }}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const imageUploadStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "black",
    // opacity: 0.2,
  },
  innerContainer: {
    display: "flex",
    height: "87%",
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#d5d4d6",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
    marginTop: 15,
    fontWeight: "700",
    fontSize: 18,
    color: "#3777f0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default ImageUpload;
