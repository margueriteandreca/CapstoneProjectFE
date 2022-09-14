import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import PostPreview from "../Components/Posts/PostPreview";

function UserProfileFeed({ userFeed, user }) {
  return (
    <View style={userFeedStyles.container}>
      <FlatList
        data={userFeed}
        renderItem={({ item }) => (
          <PostPreview key={item} post={item} user={user} />
        )}
        numColumns={3}
      />
    </View>
  );
}

const userFeedStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "65%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default UserProfileFeed;
