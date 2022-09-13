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

import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

function TextUpload() {
  const [text, setText] = useState("");
  const { params } = useRoute();

  useEffect(() => {
    params.setPostText(text);
  }, [text]);

  return (
    <View style={textPostStyles.container}>
      <Text style={textPostStyles.text}>Create a text post</Text>
      <TextInput
        style={textPostStyles.input}
        onChangeText={setText}
        value={text}
        multiline={true}
        numberOfLines={4}
        maxLength={255}
        placeholder="What's happening?"
        autoCapitalize="none"
      />
    </View>
  );
}

const textPostStyles = StyleSheet.create({
  container: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 18,
    color: "#3777f0",
  },
  input: {
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    // borderRadius: 10,
    padding: 30,
    paddingTop: 20,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
});

export default TextUpload;
