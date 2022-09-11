import React, { useState, useCallback, useMemo, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function DeletePost({ deletePost, modalVisible, setModalVisible }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={deleteStyles.container}
      >
        <AntDesign name="ellipsis1" size={30} color="#202020" />
      </TouchableOpacity>
    </>
  );
}

const deleteStyles = StyleSheet.create({
  container: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  //   modalContainer: {
  //     flex: 1,
  //     padding: 24,
  //     backgroundColor: "grey",
  //   },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default DeletePost;
