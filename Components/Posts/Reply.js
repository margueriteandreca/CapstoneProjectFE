import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ProfilePicture from "../ProfilePicture";

function Reply({ reply }) {
  console.log("SINGLE REPLY", reply);
  return (
    <View style={replyStyles.container}>
      <ProfilePicture avatar={reply.user.avatar} />
      <Text>{reply.text}</Text>
    </View>
  );
}

const replyStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Reply;
