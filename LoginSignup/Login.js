import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { TokenContext } from "../Context";
import { set } from "react-native-reanimated";

const storeLogin = async (token) => {
  console.log("!!! trying token", token);
  try {
    await SecureStore.setItemAsync("myToken", token);
    console.log("!!! stored token", token);
  } catch (e) {
    console.log("ASYNC STORAGE SET ERROR", e);
  }
};

function Login({ setLogoUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();

  const { token, setToken } = useContext(TokenContext);
  console.log(token);

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/token/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("!!!! Setting Token from fetch: ", data);
        setToken(data.access);
        storeLogin(data.access);
      });
  };

  return (
    <View
    // style={{
    //   paddingTop: 500,
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    // }}
    >
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        underlayColor="#fff"
      >
        <Text style={[styles.loginText]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    width: "90%",
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  //     height: 50,
  //     borderWidth: 1,
  //     borderColor: "rgba(0, 0, 0, 0.2)",
  //     marginHorizontal: 20,
  //     marginVertical: 10,
  //     borderRadius: 25,
  //     paddingLeft: 10,
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A4199",
    width: "90%",
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  signUpButtonContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  clickToSignUp: {
    color: "#3777f0",
  },
});

export default Login;
