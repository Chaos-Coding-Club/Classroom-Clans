import { Link, router, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import { Input, Button, Text, View } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import DismissKeyboard from "@/Components/dismissKeyboard";
import { login } from "@/api/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEmail(e.nativeEvent.text);
  };

  const handlePasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(e.nativeEvent.text);
  };

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.replace("/(app)/Home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LinearGradient
      colors={["$blue9", "$background"]}
      start={[1, 0]}
      end={[0, 1]}
      style={{ flex: 1 }}
    >
      <DismissKeyboard>
        <View style={styles.form}>
          <Text theme="Input" style={styles.Header}>
            Login Page
          </Text>
          <Input
            theme="Input"
            placeholder="Email"
            value={email}
            textContentType="emailAddress"
            onChange={handleEmailChange}
            style={styles.input}
          />
          <Input
            theme="Input"
            placeholder="Password"
            textContentType="password"
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
            returnKeyType="go"
            secureTextEntry
            autoCorrect={false}
          />
          <Button theme="Button" onPress={handleLogin}>
            Login
          </Button>
          <Link href="/Register/">
            <Text theme="TextArea" style={styles.Text}>
              Don't have an account? Register here!
            </Text>
          </Link>
        </View>
      </DismissKeyboard>
    </LinearGradient>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  Header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  Text: {
    padding: 10,
  },
});
