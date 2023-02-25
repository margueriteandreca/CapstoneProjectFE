import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "./Context";

function LogoutFooter() {
  const { navigate } = useNavigation();

  const { token, setToken } = useContext(TokenContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        backgroundColor: "#9c7aff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        postition: "absolute",
        width: 250,
        height: 50,
        borderRadius: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
        Log out
      </Text>
    </TouchableOpacity>
  );
}

export default LogoutFooter;
