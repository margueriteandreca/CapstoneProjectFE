import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

function Kinta() {
  return (
    <View>
      <Image source={require("../assets/kinta-logo.png")} />
    </View>
  );
}

export default Kinta;
