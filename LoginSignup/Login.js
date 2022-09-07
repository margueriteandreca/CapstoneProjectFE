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
import { TokenContext } from "../App";

const storeLogin = async (token) => {
  console.log("!!! trying token", token);
  try {
    await SecureStore.setItemAsync("myToken", token);
    console.log("!!! stored token", token);
  } catch (e) {
    console.log("ASYNC STORAGE SET ERROR", e);
  }
};

function Login() {
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
        console.log("!!!! data: ", data);
        setToken(data.access);
        storeLogin(data.access);
      });
  };

  return (
    <View
      style={{
        paddingTop: 500,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
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
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 180,
    borderRadius: 5,
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3777f0",
    width: 180,
    height: 40,
    borderRadius: 20,
  },
  loginText: {
    color: "white",
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
