import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useState, useMemo } from "react";

import TimePicker from "react-native-wheel-time-picker";

function Clock() {
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

  const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
  const [hour, min] = useMemo(() => {
    return [
      Math.floor(timeValue / MILLISECONDS_PER_HOUR),
      Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
      Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
    ];
  }, [timeValue]);
  return (
    <View style={styles.container}>
      <TimePicker
        value={timeValue}
        wheelProps={{
          wheelHeight: 70,
          itemHeight: 15,
        }}
        onChange={(newValue) => setTimeValue(newValue)}
      />
      <Text style={styles.timeValue}>{`${hour < 10 ? "0" : ""}${hour}:${
        min < 10 ? "0" : ""
      }${min}`}</Text>
    </View>
  );
}

export default Clock;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timeValue: {
    marginVertical: 20,
  },
});
