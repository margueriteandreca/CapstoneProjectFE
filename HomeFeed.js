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
import PostCardFull from "./Components/Posts/PostCardFull";
import { useFocusEffect } from "@react-navigation/native";

import { TokenContext } from "./Context";

function HomeFeed() {
  const [feedPhotos, setFeedPhotos] = useState([]);

  const { token } = useContext(TokenContext);

  const fetchFeed = useCallback(() => {
    fetch("http://127.0.0.1:8000/feed/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`FEED DATA`, data);
        setFeedPhotos(data);
      });
  }, [token]);

  useEffect(() => {
    fetchFeed();
  }, []);

  useFocusEffect(fetchFeed);

  return (
    <FlatList
      data={feedPhotos}
      renderItem={({ item }) => (
        <View style={{ height: 600, width: "100%" }}>
          <PostCardFull key={item.id} post={item} />
        </View>
      )}
    />
  );
}

export default HomeFeed;
