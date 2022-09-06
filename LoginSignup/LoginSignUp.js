import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import Login from "./Login";
import Signup from "./Signup";

function LoginSignUp() {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isLogin, setIsLogin] = useState(false);

  //   const imageAnimatedStyle = useAnimatedStyle(() => {
  //     const interpolation = interpolate(
  //       imagePosition.value,
  //       [0, 1],
  //       [-height / 2, 0]
  //     );
  //     return {
  //       transform: [
  //         { translateY: withTiming(interpolation, { duration: 1000 }) },
  //       ],
  //     };
  //   });

  return <View>{isLogin ? <Login /> : <Signup />}</View>;
}

export default LoginSignUp;
