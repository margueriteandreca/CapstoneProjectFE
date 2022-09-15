import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  Image as RNImage,
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
  const { height, width } = useWindowDimensions();

  const imagePosition = useSharedValue(1);

  const [isLogin, setIsLogin] = useState(true);
  const [logoUp, setLogoUp] = useState();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      // transform: [
      //   { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      // ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    setIsLogin(true);
    LayoutAnimation.configureNext({
      duration: 800,
      update: { type: "linear" },
    });
    setLogoUp(true);
  };

  const signUpHandler = () => {
    imagePosition.value = 0;
    setIsLogin(false);
    LayoutAnimation.configureNext({
      duration: 800,
      update: { type: "linear" },
    });
    setLogoUp(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height={height + 100} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height + 100} />
            </ClipPath>
            <Image
              href={require("../assets/gradient-purple.png")}
              width={width + 100}
              height={height + 100}
              preserveAspectRatio="xMidyMid slice"
              clipPath="url(#clipPathId)"
            />
          </Svg>

          <Animated.View
            style={[styles.closeButtonContainer, closeButtonContainerStyle]}
          >
            <Text
              onPress={() => {
                imagePosition.value = 1;
                LayoutAnimation.configureNext({
                  duration: 800,
                  update: { type: "linear" },
                });
                setLogoUp(false);
              }}
            >
              ✕
            </Text>
          </Animated.View>
        </Animated.View>
        <View style={{ justifyContent: "center", height: height / 3 }}>
          <Animated.View style={buttonsAnimatedStyle}>
            <TouchableOpacity style={styles.button}>
              <Text onPress={loginHandler} style={styles.buttonText}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={buttonsAnimatedStyle}>
            <TouchableOpacity style={styles.button}>
              <Text onPress={signUpHandler} style={styles.buttonText}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
            {isLogin ? (
              <Login
                closeButtonContainerStyle={closeButtonContainerStyle}
                setLogoUp={setLogoUp}
              />
            ) : (
              <Signup />
            )}
          </Animated.View>
        </View>
      </View>
      <View style={logoUp ? styles.upStyle : styles.downStyle}>
        <RNImage
          source={require("../assets/kinta-logo-2.png")}
          style={{ height: 400, width: 200, resizeMode: "contain" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    // backgroundColor: "rgba(123,104,238,0.8)",
    backgroundColor: "#4A4199",
    opacity: 0.8,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  upStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 200,
    zIndex: 999,
    top: 100,
    right: 0,
    bottom: 0,
    left: 95,
  },
  downStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 200,
    zIndex: 999,
    top: 250,
    right: 0,
    bottom: 0,
    left: 95,
  },
  // bottomContainer: {
  //   justifyContent: "center",
  //   height: height / 3,
  // },
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
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "center",
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    top: -20,
  },
});

export default LoginSignUp;
