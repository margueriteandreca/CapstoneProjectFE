import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import PostCardFull from "./PostCardFull";

function HomeFeed() {
  return (
    <FlatList
      data={[0, 1, 2, 3, 4, 5, 6, 7]}
      renderItem={({ item }) => (
        <View style={{ height: 600, width: "100%" }}>
          <PostCardFull key={item} />
        </View>
      )}
    />
  );
}

export default HomeFeed;
