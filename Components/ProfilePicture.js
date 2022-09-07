import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function ProfilePicture({ isBig, avatar }) {
  return (
    <View
      style={
        isBig
          ? profilePictureStyles.bigContainer
          : profilePictureStyles.smallContainer
      }
    >
      <Image
        source={{ uri: `http://127.0.0.1:8000/${avatar}` }}
        style={
          isBig
            ? profilePictureStyles.bigImage
            : profilePictureStyles.smallImage
        }
      />
    </View>
  );
}

const profilePictureStyles = StyleSheet.create({
  bigContainer: {
    height: 86,
    width: 86,
    margin: 10,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#9c7aff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bigImage: {
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  smallContainer: {
    height: 36,
    width: 36,
    margin: 10,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#9c7aff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  smallImage: {
    height: 30,
    width: 30,
    margin: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
});

export default ProfilePicture;
