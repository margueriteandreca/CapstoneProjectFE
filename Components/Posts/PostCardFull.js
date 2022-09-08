import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ProfilePicture from "../ProfilePicture";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function PostCardFull({ item }) {
  const { text, images, like_count, user } = item;

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
        <ProfilePicture avatar={user.avatar} />
        <Text style={postCardFullStyles.username}>{`@${user.username}`}</Text>
      </View>
      <View style={postCardFullStyles.innerContainer}>
        {images[0] ? (
          <Image
            source={{ uri: `http://127.0.0.1:8000/${images[0].image}` }}
            style={postCardFullStyles.image}
          />
        ) : (
          <View style={postCardFullStyles.textContainer}>
            <Text style={postCardFullStyles.text}>{item ? text : null}</Text>
          </View>
        )}
      </View>
      <View style={postCardFullStyles.likesRepliesContainer}>
        <FontAwesome name="heart-o" size={24} color="black" />
        {/* <FontAwesome name="heart" size={24} color="red" /> */}
        <FontAwesome name="comment-o" size={24} color="black" />
      </View>
      <View style={postCardFullStyles.likesContainer}>
        <Text>
          {`${like_count}`} {like_count === 1 ? `like` : `likes`}
        </Text>
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
  textContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Times New Roman",
    fontSize: 18,
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
