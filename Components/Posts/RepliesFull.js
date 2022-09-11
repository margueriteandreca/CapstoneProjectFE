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
import Reply from "./Reply";

function RepliesFull({ route }) {
  const dummy = [1, 2, 3, 4];

  const { replies } = route.params;

  console.log(replies);

  return (
    <View>
      <FlatList
        data={replies}
        renderItem={({ item }) => (
          <View style={{ height: 80, width: "100%" }}>
            <Reply key={item.id} reply={item} />
          </View>
        )}
      />
    </View>
  );
}

export default RepliesFull;
