import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import MaskedViewIOS from "@react-native-masked-view/masked-view";

function Splash() {
  const colorLayer = (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#9c7aff" }]} />
  );
  const whiteLayer = (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#ffffff" }]} />
  );

  return (
    <View style={splashStyles.container}>
      {colorLayer}
      <MaskedViewIOS
        style={splashStyles.innerContainer}
        maskElement={
          <View style={splashStyles.centered}>
            <Animated.Image
              source={{
                uri: "https://www.beautycrew.com.au/media/42590/megan-thee-stallion-double-ponytails.jpg?width=675",
              }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          </View>
        }
      >
        {whiteLayer}

        <Animated.View style={splashStyles.centered}>
          <Text>Ayooo</Text>
        </Animated.View>
      </MaskedViewIOS>
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
