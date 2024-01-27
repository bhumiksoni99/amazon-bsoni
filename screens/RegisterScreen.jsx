import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Touchable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { registerUserApi } from "../helpers/apis";

const DOMAIN = "http://localhost:8000";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const headerHeight = useHeaderHeight();

  const registerUser = async () => {
    const user = {
      name,
      email,
      password,
    };
    try {
      await registerUserApi(user);
      Alert.alert("Registration Successful");
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      Alert.alert("Registration Error", e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={{ width: 150, height: 100, marginTop: 50 }}
        source={{
          uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Register Your Account
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <MaterialIcons name="person" size={24} color="black" />
          <TextInput
            placeholder="Enter your name"
            style={styles.inputField}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.input}>
          <AntDesign name="mail" size={24} color="black" />
          <TextInput
            placeholder="Enter your email"
            style={styles.inputField}
            textContentType="emailAddress"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="lock" size={24} color="black" />
          <TextInput
            placeholder="Enter your password"
            style={styles.inputField}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#56ADDC" }}>Forgot Password</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#FEBE10",
          padding: 10,
          marginTop: 40,
          borderRadius: 5,
        }}
        onPress={() => registerUser()}
      >
        <Text style={{ fontSize: 16, width: 200, textAlign: "center" }}>
          Register
        </Text>
      </TouchableOpacity>
      <Text style={{ color: "grey", marginTop: 20, fontSize: 16 }}>
        Already have an account?{" "}
        <Text
          style={{ color: "#56ADDC" }}
          onPress={() => navigation.navigate("login")}
        >
          Login
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 80,
  },
  input: {
    flexDirection: "row",
    marginBottom: 40,
    backgroundColor: "#C8C7C8",
    padding: 10,
  },
  inputField: {
    marginLeft: 10,
  },
});
