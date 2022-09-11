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

function PostPreview({ isScheduling, post, user }) {
  const { navigate } = useNavigation();

  const handleOpenPost = () => {
    navigate("PostCardFullScreen", {
      post: {
        ...post,
        user,
      },
    });
  };

  const handleOpenScheduling = () => {
    navigate("ProfileStack", { screen: "Scheduling" });
  };

  return (
    <TouchableOpacity
      onPress={isScheduling ? handleOpenScheduling : handleOpenPost}
      style={postPreviewStyles.container}
    >
      <View style={postPreviewStyles.textContainer}>
        <Text>{post ? post.text : null}</Text>
      </View>
    </TouchableOpacity>
  );
}

const postPreviewStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "33%",
    aspectRatio: 1,
    marginTop: 3,
    marginRight: 3,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostPreview;
