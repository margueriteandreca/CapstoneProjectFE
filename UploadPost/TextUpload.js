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

import { TextInput } from "react-native-gesture-handler";

function TextUpload() {
  const [textPost, setTextPost] = useState("");
  return (
    <View style={textPostStyles.container}>
      <Text style={textPostStyles.text}>Compose a kint</Text>
      <TextInput
        style={textPostStyles.input}
        onChangeText={setTextPost}
        value={textPost}
        multiline={true}
        numberOfLines={4}
        placeholder="tell kinta what's wrong bb "
        autoCapitalize="none"
      />
    </View>
  );
}

const textPostStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
  },
  input: {
    height: "70%",
    width: "70%",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});

export default TextUpload;
