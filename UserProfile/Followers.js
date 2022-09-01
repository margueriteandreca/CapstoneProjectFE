import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

function Followers() {
  return (
    <View style={followersStyles.container}>
      <Text>followers</Text>
    </View>
  );
}

const followersStyles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    width: "70%",
    height: 120,
  },
});

export default Followers;
