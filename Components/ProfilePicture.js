import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function ProfilePicture() {
  return (
    <View style={profilePictureStyles.container}>
      <Image
        source={{
          uri: "https://www.beautycrew.com.au/media/42590/megan-thee-stallion-double-ponytails.jpg?width=675",
        }}
        style={profilePictureStyles.image}
      />
    </View>
  );
}

const profilePictureStyles = StyleSheet.create({
  container: {
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
  image: {
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
});

export default ProfilePicture;
