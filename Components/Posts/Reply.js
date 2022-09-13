import React, { useContext } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import ProfilePicture from "../ProfilePicture";
import { useState, useEffect } from "react";
import { UserContext } from "../../App";

function Reply({ reply }) {
  console.log("SINGLE REPLY", reply);

  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useContext(UserContext);

  const handleDeleteReply = () => {
    fetch().then().then();
  };

  return (
    <View style={replyStyles.container}>
      <ProfilePicture avatar={reply.user.avatar} />
      <View style={replyStyles.innerContainer}>
        <Text style={replyStyles.username}>{`@${reply.user.username}  `}</Text>
        <View style={replyStyles.replyContainer}>
          <Text style={replyStyles.reply} numberOfLines={4}>
            {reply.text}
          </Text>
        </View>
      </View>
      {user.id === reply.user.id && (
        <TouchableOpacity
          style={replyStyles.delete}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text>✕</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={replyStyles.centeredView}>
          <View style={replyStyles.modalView}>
            <Pressable
              style={[replyStyles.buttonContainer, { backgroundColor: "red" }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={replyStyles.textStyle}>Delete reply</Text>
            </Pressable>

            <Pressable
              style={[replyStyles.buttonContainer]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={replyStyles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const replyStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: 390,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    paddingBottom: 5,
  },
  innerContainer: {
    marginTop: 18,

    width: "80%",
    alignItems: "flex-start",
  },
  username: {
    fontSize: 16,
    fontWeight: "700",
  },
  replyContainer: {
    flexDirection: "row",
  },
  reply: {
    fontSize: 16,
    flexShrink: 1,

    flexWrap: "wrap",
  },
  delete: {
    marginTop: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 700,
    // backgroundColor: "red",
  },
  modalView: {
    width: "100%",
    height: 300,
    // margin: 20,
    backgroundColor: "black",
    opacity: 0.7,
    borderRadius: 20,
    paddingTop: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    height: 50,
    // marginTop: 5,
    borderRadius: 20,
    // padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Reply;
