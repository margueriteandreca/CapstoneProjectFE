import React, { useEffect, useState, useContext } from "react";
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

  useEffect(() => {
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

  return (
    <View style={scheduledPostsStyles.container}>
      <FlatList
        data={scheduledPosts}
        renderItem={({ item }) => (
          <View>
            <PostPreview key={item.id} post={item} isUnpublished={true} />
          </View>
        )}
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
