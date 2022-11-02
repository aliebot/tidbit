import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (confirmPassword != password) {
      alert("Password does not match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCred) => {
          await setDoc(doc(db, "users", userCred.user.uid), {
            email,
            userName: username,
            profileImage:
              "https://firebasestorage.googleapis.com/v0/b/tidbit-8a75e.appspot.com/o/male-profile-image-placeholder.png?alt=media&token=b45d9ed5-e3d4-45af-b19e-cd0751878140",
            bio: "",
            followers: 0,
            followed: 0,
          })
            .then(() => {
              navigation.navigate("Home");
              setEmail("");
              setUsername("");
              setPassword("");
              setConfirmPassword("");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters");
          } else if (error.code === "auth/email-already-in-use") {
            alert(
              "This email is already associated with an account. Try loging in."
            );
          } else {
            console.log(
              "error code: " +
                error.code +
                "\n" +
                "error message" +
                error.message
            );
          }
        });
    }
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
          placeholder="username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          placeholder="confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => {
            navigation.navigate("Login");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }}
        >
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 40,
    alignItems: "center",
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
    marginTop: 60,
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
