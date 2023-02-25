import React, {
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import PostCardFull from "./PostCardFull";
import { TokenContext } from "../../Context";

function PostCardFullScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const { token } = useContext(TokenContext);

  const { params } = useRoute();
  const { post } = params;

  const handleDeletePost = () => {
    console.log("handle delete");
    fetch(`http://127.0.0.1:8000/new_post/`, {
      method: "DELETE",
      body: JSON.stringify({
        id: post.id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setModalVisible(!modalVisible);
    navigation.goBack();
  };

  return (
    <>
      {post && (
        <PostCardFull
          post={post}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Pressable
                style={[
                  modalStyles.buttonContainer,
                  { backgroundColor: "red" },
                ]}
                onPress={handleDeletePost}
              >
                <Text style={modalStyles.textStyle}>Delete post</Text>
              </Pressable>

              <Pressable
                style={[modalStyles.buttonContainer]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const modalStyles = StyleSheet.create({
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

export default PostCardFullScreen;
