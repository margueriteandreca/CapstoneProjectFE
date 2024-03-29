import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import DeletePost from "./DeletePost";
import { UserContext, TokenContext } from "../../Context";

function PostCardFull({ post, modalVisible, setModalVisible }) {
  const { text, images, like_count, user: postUser, replies, likes } = post;

  const [likeCount, setLikeCount] = useState(like_count);
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { token } = useContext(TokenContext);
  // loggedInUser is alias for user, had to be called a new name in this destructure
  // not to conflict with user destructured from post
  const { user: loggedInUser } = useContext(UserContext);
  const isMyPost = loggedInUser.id === postUser.id;

  const [myLike, setMyLike] = useState(
    likes.find((like) => like.user === loggedInUser.id)
  );

  console.log("!!! LIKES", likes);
  // Post will have likes
  // Likes will have a user id
  // If one of those like user ids matches logged in user
  // set the default isLiked to true
  // store that like id in a state to be referenced on unlike

  console.log("!!!!!!!!", post);
  console.log("REPLIES", replies);

  function handleOnLike() {
    fetch("http://127.0.0.1:8000/like/", {
      method: "POST",
      body: JSON.stringify({
        post: post.id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyLike(data);
      });
    setLikeCount((likeCount) => likeCount + 1);
  }

  function handleUnLike() {
    fetch(`http://127.0.0.1:8000/like/${myLike.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setMyLike(null);
    setLikeCount((likeCount) => likeCount - 1);
  }

  const deletePost = () => {
    fetch(`http://127.0.0.1:8000/post/${post.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleViewAllReplies = () => {
    navigate("RepliesFull", {
      replies,
      post,
    });
  };

  const navigateToUserProfile = () => {
    navigate("ProfileScreen", {
      postUser,
      isMe: false,
    });
  };

  return (
    <View style={postCardFullStyles.outerContainer}>
      <View style={postCardFullStyles.headerContainer}>
        <View style={postCardFullStyles.userContainer}>
          <ProfilePicture avatar={postUser.avatar} />
          <TouchableOpacity onPress={navigateToUserProfile}>
            <Text
              style={postCardFullStyles.username}
            >{`@${postUser.username}`}</Text>
          </TouchableOpacity>
        </View>
        {isMyPost && (
          <DeletePost
            deletePost={deletePost}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
      <View style={postCardFullStyles.innerContainer}>
        {images[0] ? (
          <Image
            source={{ uri: `http://127.0.0.1:8000/${images[0].image}` }}
            style={postCardFullStyles.image}
          />
        ) : (
          <View style={postCardFullStyles.textOuter}>
            <View style={{}}>
              <FontAwesome name="quote-left" size={24} color="#9c7aff" />
            </View>

            <View style={postCardFullStyles.textContainer}>
              {/* <View
                style={{ width: 3, height: "90%", backgroundColor: "#665EC2" }}
              ></View> */}
              <Text style={postCardFullStyles.text}>{post ? text : null}</Text>
            </View>
            <View style={{ left: 280 }}>
              <FontAwesome name="quote-right" size={24} color="#9c7aff" />
            </View>
          </View>
        )}
      </View>
      <View style={postCardFullStyles.likesRepliesContainer}>
        {myLike ? (
          <TouchableOpacity onPress={handleUnLike}>
            <FontAwesome name="heart" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleOnLike}>
            <FontAwesome name="heart-o" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleViewAllReplies}>
          <FontAwesome name="reply" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={postCardFullStyles.likesContainer}>
        <Text style={{ fontSize: 16 }}>
          {`${likeCount}`} {likeCount === 1 ? `like` : `likes`}
        </Text>
      </View>

      <View style={postCardFullStyles.repliesContainer}>
        {replies && replies.length > 0 ? (
          <>
            <View style={postCardFullStyles.replyPreview}>
              <Text style={postCardFullStyles.usernameText}>
                {replies &&
                  replies[replies.length - 1] &&
                  replies[replies.length - 1].user.username}
                {"  "}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {replies &&
                  replies[replies.length - 1] &&
                  replies[replies.length - 1].text}
              </Text>
            </View>
            <View style={postCardFullStyles.replyPreview}>
              <Text style={postCardFullStyles.usernameText}>
                {replies &&
                  replies[replies.length - 2] &&
                  replies[replies.length - 2].user.username}
                {"  "}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {replies &&
                  replies[replies.length - 2] &&
                  replies[replies.length - 2].text}
              </Text>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleViewAllReplies}>
            <Text style={postCardFullStyles.viewAllText}>
              Reply to {`@${postUser.username}`}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleViewAllReplies}>
          {replies && replies.length > 2 && (
            <Text style={postCardFullStyles.viewAllText}>View all replies</Text>
          )}
        </TouchableOpacity>
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
    // backgroundColor: "red",
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
  textOuter: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "flexstart",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  textContainer: {
    width: "100%",
    height: "80%",
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 25,
    // // alignItems: "center",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "purple",
  },
  text: {
    fontFamily: "Georgia",
    fontSize: 20,
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.3,
    fontSize: 16,
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
  },
  replyPreview: {
    width: "100%",
    direction: "flex",
    flexDirection: "row",
    marginBottom: 2,
  },
  usernameText: {
    fontWeight: "700",
    fontSize: 16,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewAllText: {
    opacity: 0.8,
    marginTop: 2,
  },
});
export default PostCardFull;
