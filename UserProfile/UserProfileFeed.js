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

function UserProfileFeed() {
  return (
    <View style={userFeedStyles.container}>
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => (
          <PostPreview key={item} isScheduling={false} />
        )}
        numColumns={3}
      />
    </View>
  );
}

const userFeedStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default UserProfileFeed;
