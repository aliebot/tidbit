import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("This user does not exist. Please register.");
        } else if (error.code === "auth/invalid-email") {
          alert("Invalid email address.");
        } else if (error.code === "auth/wrong-password") {
          alert("Invalid password for this email.");
        } else {
          console.log(
            "error code: " + error.code + "\n" + "error message" + error.message
          );
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.title}>
        <Text style={styles.titleText}>tidbit</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 40,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#F50057",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 6,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#F50057",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 6,
    borderColor: "#F50057",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#F50057",
    fontWeight: "700",
    fontSize: 16,
  },
});
// #F50057
