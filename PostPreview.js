import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function PostPreview() {
  const { navigate } = useNavigation();

  const handleOpenPost = () => {
    navigate("PostCardFull");
  };

  return (
    <TouchableOpacity
      onPress={handleOpenPost}
      style={postPreviewStyles.container}
    >
      <Text>POST PREV</Text>
    </TouchableOpacity>
  );
}

const postPreviewStyles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    width: "33%",
    aspectRatio: 1,
    marginTop: 3,
    marginRight: 3,
  },
});

export default PostPreview;
