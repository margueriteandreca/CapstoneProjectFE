import React, { useContext } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import Reply from "./Reply";
import ReplyKeyboard from "./ReplyKeyboard";
import { useState, useEffect } from "react";

import { TokenContext } from "../../Context";

function RepliesFull({ route }) {
  const [reply, setReply] = useState("");

  const { replies, post } = route.params;

  console.log(`!!!!!!!!RP`, replies, post);

  const { token } = useContext(TokenContext);

  const handlePostReply = () => {
    fetch("http://127.0.0.1:8000/reply/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: reply,
        post: post.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <View style={repliesFullStyles.container}>
      <FlatList
        data={replies}
        renderItem={({ item }) => (
          <View style={{ width: "100%" }}>
            <Reply key={item.id} reply={item} />
          </View>
        )}
      />
      <View style={repliesFullStyles.keyboard}>
        <ReplyKeyboard
          handlePostReply={handlePostReply}
          reply={reply}
          setReply={setReply}
        />
      </View>
    </View>
  );
}

const repliesFullStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  keyboard: {
    // marginBottom: 5,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    height: 65,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default RepliesFull;
