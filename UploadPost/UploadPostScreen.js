import React, { useCallback } from "react";
import { useState, useContext } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { TokenContext } from "../Context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TextUpload from "./TextUpload";
import ImageUpload from "./ImageUpload";

import {
  useNavigation,
  useRoute,
  useFocusEffect,
  CommonActions,
} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function UploadPostScreen() {
  const { params } = useRoute();

  const [isPatch, setIsPatch] = useState(false);
  const [postIdToPatch, setPostIdToPatch] = useState(null);
  const [postText, setPostText] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const { navigate } = navigation;

  const { token } = useContext(TokenContext);

  const handleCancel = () => {
    setDate(null);
    setPostImage(null);
    setPostText(null);
    setIsPatch(false);
    setPostIdToPatch(null);
  };

  const setPostFromParams = useCallback(() => {
    if (params && params.patchPost) {
      const { publication_datetime, images, text, id } = params.patchPost;
      const postDate = new Date(publication_datetime);
      const now = new Date();
      if (now.getTime() < postDate.getTime()) {
        setDate(new Date(publication_datetime));
      }
      setPostText(text);
      if (images && images[0]) {
        const prefix = "http://127.0.0.1:8000";
        const img = images[0].image;
        const uri = img && img.includes(prefix) ? img : `${prefix}${img}`;
        setPostImage({ uri });
      }
      setPostIdToPatch(id);
      setIsPatch(true);
      navigation.setParams({ patchPost: undefined });
    } else {
      handleCancel();
    }
  }, []);

  useFocusEffect(setPostFromParams);

  const showDatePicker = () => {
    setIsOpen(true);
  };

  const hideDatePicker = () => {
    setIsOpen(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
    setTimeout(() => {
      setModalVisible(true);
    }, 800);
  };

  const handleSaveDraft = () => {
    uploadPost(true);
  };

  const uploadPost = (isDraft = false, isSchedule = false) => {
    let body = {};
    if (postImage && postImage.base64) {
      body.image = postImage.base64;
    }
    if (postText) {
      body.text = postText;
    }
    if (date && isSchedule) {
      body.publication_datetime = date;
    }
    if (postIdToPatch) {
      body.id = postIdToPatch;
      if (date === null || isSchedule === false) {
        body.publication_datetime = new Date();
      }
      body.is_draft = false;
    }
    if (isDraft) {
      body.is_draft = true;
    }

    fetch("http://127.0.0.1:8000/new_post/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: isPatch ? "PATCH" : "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isDraft) {
          navigate("Drafts");
        } else if (isSchedule) {
          navigate("Scheduled Posts");
        } else {
          navigate("Home", { screen: "ProfileStack" });
        }
      })
      .catch((e) => console.log("!!! POST ERROR", e));
  };

  return (
    <View style={uploadStyles.container}>
      <View style={uploadStyles.postContainer}>
        <Tab.Navigator>
          <Tab.Screen
            name="Text"
            children={() => (
              <TextUpload setPostText={setPostText} postText={postText} />
            )}
          />
          <Tab.Screen
            name="Image"
            children={() => (
              <ImageUpload setPostImage={setPostImage} postImage={postImage} />
            )}
          />
        </Tab.Navigator>
      </View>

      <View style={uploadStyles.schedulingContainer}>
        <View style={uploadStyles.uploadNow}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={uploadStyles.draftsText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSaveDraft}
            disabled={!postImage && !postText}
          >
            <Text style={uploadStyles.draftsText}> Save to drafts</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={uploadStyles.buttonContainer}
            onPress={() => uploadPost()}
            disabled={!postImage && !postText}
          >
            <Text style={uploadStyles.schedulingText}>Share now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showDatePicker}
            style={uploadStyles.buttonContainer}
          >
            <Text style={uploadStyles.schedulingText}>Schedule post</Text>
          </TouchableOpacity>
          {date && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 35,
                }}
              >
                <Text style={uploadStyles.postingText}>Posting at: </Text>
                <Text style={uploadStyles.postingText}>
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </Text>
              </View>

              <TouchableOpacity onPress={() => uploadPost(false, true)}>
                <Text
                  style={{ fontSize: 18, color: "green", fontWeight: "700" }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isOpen}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={uploadStyles.modal}>
          <Text style={{ color: "white" }}>Your post is scheduled for:</Text>
          <Text style={{ color: "white" }}>
            {date &&
              `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
          </Text>
          <TouchableOpacity
            style={{ height: 50, width: 100, backgroundColor: "purple" }}
          >
            <Text style={{ color: "white" }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
}

const uploadStyles = StyleSheet.create({
  container: {
    display: "flex",
    // justifyContent: "space-between",
  },
  postContainer: {
    display: "flex",
    height: 480,
    width: "100%",
  },
  uploadNow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    // marginTop: 10,
    width: "80%",
  },
  cancelText: {
    fontWeight: "500",
  },
  shareText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#4A4199",
  },
  schedulingContainer: {
    display: "flex",
    height: "45%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  schedulingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A4199",
    marginBottom: 10,
  },
  draftsText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#4A4199",
  },
  postingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  modal: {
    height: 200,
    width: 300,
    backgroundColor: "black",
    opacity: 0.7,
    borderRadius: 10,
    marginTop: 300,
    left: 50,
  },
});

export default UploadPostScreen;
