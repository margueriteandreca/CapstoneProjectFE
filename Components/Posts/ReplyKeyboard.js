import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function ReplyKeyboard({ handlePostReply, reply, setReply }) {
  return (
    <KeyboardAvoidingView
      style={keyboardStyles.main}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={keyboardStyles.inputContainer}>
        <TextInput
          style={keyboardStyles.input}
          value={reply}
          onChangeText={setReply}
        />
      </View>

      <TouchableOpacity
        style={keyboardStyles.buttonContainer}
        onPress={handlePostReply}
      >
        <FontAwesome name="reply" size={24} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const keyboardStyles = StyleSheet.create({
  main: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "#e5e4e2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 15,
  },
  input: {
    width: "100%",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#3777f0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    marginLeft: 2,
    width: 25,
    height: 25,
  },
});

export default ReplyKeyboard;
