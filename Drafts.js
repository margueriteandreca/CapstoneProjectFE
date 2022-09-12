import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import PostPreview from "./Components/Posts/PostPreview";

function Drafts({ navigation }) {
  return (
    <View style={draftStyles.container}>
      <PostPreview isScheduling={false} />
      <PostPreview isScheduling={false} />
      <PostPreview isScheduling={false} />
      <PostPreview isScheduling={false} />
      <PostPreview isScheduling={false} />
      <PostPreview isScheduling={false} />
    </View>
  );
}

const draftStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

export default Drafts;
