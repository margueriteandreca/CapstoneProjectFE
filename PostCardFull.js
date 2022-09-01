import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function PostCardFull() {
  return (
    <View style={postCardFullStyles.outerContainer}>
      <View style={postCardFullStyles.innerContainer}>
        <Image
          source={{
            uri: "https://www.beautycrew.com.au/media/42590/megan-thee-stallion-double-ponytails.jpg?width=675",
          }}
          style={postCardFullStyles.image}
        />
      </View>
    </View>
  );
}

const postCardFullStyles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    height: "100%",
    // backgroundColor: "purple",
  },
  innerContainer: {
    display: "flex",
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default PostCardFull;
