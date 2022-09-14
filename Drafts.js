import React, { useState, useEffect, useContext } from "react";
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

function Drafts({ navigation }) {
  const [drafts, setDrafts] = useState([]);

  const { token } = useContext(TokenContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/drafts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`DRAFTS`, data);
        setDrafts(data);
      });
  }, []);

  return (
    <View style={draftStyles.container}>
      <FlatList
        data={drafts}
        renderItem={({ item }) => (
          <View>
            <PostPreview key={item.id} post={item} isUnpublished={true} />
          </View>
        )}
      />
    </View>
  );
}

const draftStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

export default Drafts;
