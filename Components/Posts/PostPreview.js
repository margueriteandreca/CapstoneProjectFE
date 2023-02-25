import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function PostPreview({ isUnpublished = false, post, user }) {
  const { navigate } = useNavigation();

  const handleOpenPost = () => {
    navigate("PostCardFullScreen", {
      post: {
        ...post,
        user,
      },
    });
  };

  const handleOpenUploadScreen = () => {
    navigate("New Post", {
      patchPost: post,
    });
  };

  return (
    <TouchableOpacity
      onPress={isUnpublished ? handleOpenUploadScreen : handleOpenPost}
      style={postPreviewStyles.container}
    >
      {post.images[0] ? (
        <Image
          source={{ uri: `http://127.0.0.1:8000/${post.images[0].image}` }}
          style={postPreviewStyles.image}
        />
      ) : (
        <View style={postPreviewStyles.textContainer}>
          <View style={{}}>
            <FontAwesome name="quote-left" size={20} color="#9c7aff" />
          </View>

          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={postPreviewStyles.text}
          >
            {post ? post.text : null}
          </Text>
          <View style={{ left: 80 }}>
            <FontAwesome name="quote-right" size={20} color="#9c7aff" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const postPreviewStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "33%",
    aspectRatio: 1,
    marginTop: 3,
    marginRight: 3,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    marginLeft: 5,
    fontFamily: "Georgia",
  },
});

export default PostPreview;
