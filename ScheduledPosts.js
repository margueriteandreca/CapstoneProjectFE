import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import PostPreview from "./Components/Posts/PostPreview";
import { TokenContext } from "./Context";

function ScheduledPosts({ navigation }) {
  const [scheduledPosts, setScheduledPosts] = useState([]);

  const { token } = useContext(TokenContext);

  const fetchScheduledPosts = useCallback(() => {
    fetch("http://127.0.0.1:8000/scheduled/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`SCHEDULED POSTS`, data);
        setScheduledPosts(data);
      });
  }, []);

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  useFocusEffect(fetchScheduledPosts);

  return (
    <View style={scheduledPostsStyles.container}>
      <FlatList
        data={scheduledPosts}
        renderItem={({ item }) => (
          <PostPreview key={item.id} post={item} isUnpublished={true} />
        )}
        numColumns={3}
      />
    </View>
  );
}

const scheduledPostsStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

export default ScheduledPosts;
