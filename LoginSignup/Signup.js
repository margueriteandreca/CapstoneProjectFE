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
import { useEffect, useState } from "react";

function Signup() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleSignUp = () => {
    //     const newUser = {
    //       username: username,
    //       password: password,
    //       first_name: firstName,
    //       last_name: lastName,
    //     };
    //     fetch("http://localhost:3000/users", {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //       body: JSON.stringify(newUser),
    //     }) //POST, send token as body , getter funcion
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setUser(data.user);
    //       });
    //     setIsLoggedIn(true);
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
          style={styles.signUpButton}
          onPress={handleSignUp}
          underlayColor="#fff"
        >
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </View>
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
  },
  nameInput: {
    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 15,
    width: 170,
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.2)",
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
    backgroundColor: "#3777f0",
    width: "90%",
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  signUpText: {
    color: "white",
  },
});

export default Signup;
