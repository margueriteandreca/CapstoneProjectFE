import * as React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";

import { TokenContext } from "../Context";

const storeLogin = async (token) => {
  console.log("!!! trying token", token);
  try {
    await SecureStore.setItemAsync("myToken", token);
    console.log("!!! stored token", token);
  } catch (e) {
    console.log("ASYNC STORAGE SET ERROR", e);
  }
};

function Signup() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const { token, setToken } = useContext(TokenContext);

  const handleSignUp = () => {
    const newUser = {
      username: username,
      password1: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    };
    fetch("http://127.0.0.1:8000/dj-rest-auth/registration/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newUser),
    }) //POST, send token as body , getter funcion
      .then((res) => res.json())
      .then((data) => {
        console.log("!!!! Setting Token from fetch: ", data);
        setToken(data.access_token);
        storeLogin(data.access_token);
      });
  };

  return (
    <View style={{ display: "flex", width: "100%" }}>
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.nameInput}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.nameInput}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          style={styles.signUpButton}
          onPress={handleSignUp}
          underlayColor="#fff"
        >
          <Text style={styles.signUpText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    padding: 15,
    width: "90%",
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.2)",
    fontSize: 16,
    fontWeight: "500",
  },
  nameInput: {
    height: 50,
    margin: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: 15,
    width: 170,
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.2)",
    fontSize: 16,
    fontWeight: "500",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "aqua",
    marginRight: 50,
  },
  text: {
    color: "#3777f0",
  },
  signUpButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A4199",
    width: "90%",
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  signUpText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default Signup;
