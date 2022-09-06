import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";

function PostPreview({ isScheduling }) {
  const { navigate } = useNavigation();

  const handleOpenPost = () => {
    navigate("PostCardFull");
  };

  const handleOpenScheduling = () => {
    navigate("Scheduling");
  };

  return (
    <TouchableOpacity
      onPress={isScheduling ? handleOpenScheduling : handleOpenPost}
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
