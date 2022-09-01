import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import PostPreview from "./PostPreview";

function ScheduledPosts({ navigation }) {
  return (
    <View style={scheduledPostsStyles.container}>
      <PostPreview />
      <PostPreview />
      <PostPreview />
    </View>
  );
}

const scheduledPostsStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

export default ScheduledPosts;
