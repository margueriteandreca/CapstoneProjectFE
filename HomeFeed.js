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
import PostCardFull from "./Components/Posts/PostCardFull";
import { TokenContext } from "./App";

function HomeFeed() {
  const [feedPhotos, setFeedPhotos] = useState([]);

  const { token } = useContext(TokenContext);

  useEffect(() => {
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
  }, []);

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
