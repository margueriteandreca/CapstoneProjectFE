import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ProfilePicture from "./Components/ProfilePicture";
import { useContext } from "react";

import { UserContext } from "./Context";

function Header() {
  const { user } = useContext(UserContext);

  console.log(`USER CONTEXT`, user);

  return (
    <View style={headerStyles.container}>
      {user && (
        <>
          <ProfilePicture avatar={user.avatar} />
          <Text style={headerStyles.text}>{`@${user.username}`}</Text>
        </>
      )}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    height: 60,
    paddingLeft: 2,
  },
  text: {
    fontWeight: "500",
    letterSpacing: 0.2,
  },
});

export default Header;
