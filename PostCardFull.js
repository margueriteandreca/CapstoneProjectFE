import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ProfilePicture from "./Components/ProfilePicture";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function PostCardFull() {
  function handleOnLike() {
    fetch("", {
      method: "PATCH",
      body: JSON.stringify({
        title: "foo",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <View style={postCardFullStyles.outerContainer}>
      <View style={postCardFullStyles.userContainer}>
        <ProfilePicture />
        <Text style={postCardFullStyles.username}>@myusername</Text>
      </View>
      <View style={postCardFullStyles.innerContainer}>
        <Image
          source={{
            uri: "https://www.beautycrew.com.au/media/42590/megan-thee-stallion-double-ponytails.jpg?width=675",
          }}
          style={postCardFullStyles.image}
        />
      </View>
      <View style={postCardFullStyles.likesRepliesContainer}>
        <FontAwesome name="heart-o" size={24} color="black" />
        {/* <FontAwesome name="heart" size={24} color="red" /> */}
        <FontAwesome name="comment-o" size={24} color="black" />
      </View>
      <View style={postCardFullStyles.likesContainer}>
        <Text>49503 Likes</Text>
      </View>

      <View style={postCardFullStyles.repliesContainer}>
        <Text>Comments go here</Text>
        <Text>Comments go here</Text>
        <Text>Comments go here</Text>
      </View>
    </View>
  );
}

const postCardFullStyles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    height: 600,
    width: "100%",
    // backgroundColor: "purple",
  },
  innerContainer: {
    display: "flex",
    height: 400,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  likesRepliesContainer: {
    // backgroundColor: "green",
    height: 100,
    marginTop: 10,
    width: 80,
    height: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  likesContainer: {
    display: "flex",
    marginLeft: 10,
    marginBottom: 5,
  },
  repliesContainer: {
    marginLeft: 10,
    width: "100%",
    height: 90,
    // backgroundColor: "aqua",
  },
});
export default PostCardFull;
