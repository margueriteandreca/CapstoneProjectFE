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
import PostPreview from "../Components/Posts/PostPreview";

function Scheduling() {
  return (
    <View style={schedulingStyles.container}>
      <View style={schedulingStyles.postContainer}>
        <PostPreview />
      </View>
      <View style={schedulingStyles.dateTimeContainer}>
        <Clock />
        <TouchableOpacity style={schedulingStyles.saveButtonContainer}>
          <Text>Save</Text>
        </TouchableOpacity>
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
    height: 250,
    width: "100%",
    // backgroundColor: "aqua",
  },
  dateTimeContainer: {
    height: 350,
    width: "100%",
    // backgroundColor: "green",
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scheduling;
