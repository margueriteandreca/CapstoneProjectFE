import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  s,
} from "react-native";
import { useState, useMemo } from "react";
import Clock from "./Clock";

function Scheduling() {
  return (
    <View style={schedulingStyles.container}>
      <View style={schedulingStyles.postContainer}>
        <Text>Here is preview </Text>
      </View>
      <View style={schedulingStyles.dateTimeContainer}>
        <Clock />
      </View>
    </View>
  );
}

const schedulingStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  postContainer: {
    display: "flex",
    height: 300,
    width: "100%",
    backgroundColor: "aqua",
  },
  dateTimeContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "green",
  },
});

export default Scheduling;
