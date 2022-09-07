import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useWindowDimensions } from "react-native";
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
  // const { height, width } = Dimensions.get("window");
  // const { height, width } = useWindowDimensions();

  // const imagePosition = useSharedValue(1);
  // const formButtonScale = useSharedValue(1);
  const [isLogin, setIsLogin] = useState(true);

  // const imageAnimatedStyle = useAnimatedStyle(() => {
  //   const interpolation = interpolate(imagePosition.value, [0, 1]);
  //   return {
  //     transform: [
  //       { translateY: withTiming(interpolation, { duration: 1000 }) },
  //     ],
  //   };
  // });

  // console.log(height, width);

  return (
    <View>
      {/* <Svg height={height} width={width}>
        <Image
          source={require("../assets/login-background.jpg")}
          width={width}
          height={height}
          preserveAspectRatio="xMidyMid slice"
        />
      </Svg> */}

      {/* <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <TouchableOpacity
              onPress={() =>
                (formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1)
                ))
              }
            >
              <Text style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View> */}

      {isLogin ? <Login /> : <Signup />}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   button: {
//     backgroundColor: "rgba(123,104,238,0.8)",
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: "white",
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "white",
//     letterSpacing: 0.5,
//   },
//   bottomContainer: {
//     justifyContent: "center",
//     height: height / 3,
//   },
//   textInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "rgba(0, 0, 0, 0.2)",
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 25,
//     paddingLeft: 10,
//   },
//   formButton: {
//     backgroundColor: "rgba(123,104,238,0.8)",
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: "white",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   formInputContainer: {
//     marginBottom: 70,
//     ...StyleSheet.absoluteFill,
//     zIndex: -1,
//     justifyContent: "center",
//   },
//   closeButtonContainer: {
//     height: 40,
//     width: 40,
//     justifyContent: "center",
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//     elevation: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     borderRadius: 20,
//     top: -20,
//   },
// });

export default LoginSignUp;
