import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function Followers({
  posts,
  following,
  followers,
  first_name,
  last_name,
  username,
}) {
  console.log("CHILD POSTS", posts);
  return (
    <View style={followersStyles.container}>
      <View style={followersStyles.followersContainer}>
        <TouchableOpacity>
          <View style={followersStyles.innerContainer}>
            <Text style={followersStyles.nameText}>{posts.length}</Text>
            <Text style={followersStyles.nameText}>Posts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={followersStyles.innerContainer}>
            <Text>{followers.length}</Text>
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
    </View>
  );
}

const followersStyles = StyleSheet.create({
  container: {
    // backgroundColor: "grey",
    width: "75%",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
  },

  followersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Followers;
