import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function Followers({ posts, following }) {
  console.log("CHILD POSTS", posts);
  return (
    <View style={followersStyles.container}>
      <TouchableOpacity>
        <View style={followersStyles.innerContainer}>
          <Text>{posts.length}</Text>
          <Text>Posts</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={followersStyles.innerContainer}>
          <Text>4820</Text>
          <Text>Followers</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={followersStyles.innerContainer}>
          <Text>{following.length}</Text>
          <Text>Following</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const followersStyles = StyleSheet.create({
  container: {
    // backgroundColor: "grey",
    width: "75%",
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default Followers;
