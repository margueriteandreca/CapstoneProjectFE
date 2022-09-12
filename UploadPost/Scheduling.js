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
          <Text style={schedulingStyles.saveText}>Save</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
  },
  dateTimeContainer: {
    height: 400,
    width: "100%",
    backgroundColor: "green",
    display: "flex",
    flexDirection: "flex-start",
    alignItems: "center",
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    height: 50,
    width: "40%",
    borderRadius: 40,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Scheduling;
