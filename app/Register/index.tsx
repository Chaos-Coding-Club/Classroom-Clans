import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Input, Button, Text, View, Theme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import DismissKeyboard from "@/Components/dismissKeyboard";
import { register } from "@/api/auth";
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleUsernameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUsername(e.nativeEvent.text);
  };

  const handleRegister = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(email, password, username);
      setLoading(false);
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
          {/* <Text theme style={getHeaderStyle(colorScheme || '')}>Register</Text> */}
          <Text theme="Input" style={styles.Header}>
            Register
          </Text>
          <Theme>
            <Input
              theme="Input"
              placeholder="Username"
              value={username}
              textContentType="username"
              onChange={handleUsernameChange}
              style={styles.input}
            />
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
            <Button theme="Button" onPress={handleRegister}>
              Register
            </Button>
            <Link href="/(app)/Home">
              <Text theme="TextArea" style={styles.Text}>
                Already have an account? Login here!
              </Text>
            </Link>
          </Theme>
        </View>
      </DismissKeyboard>
    </LinearGradient>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  Header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  Text: {
    marginTop: 20,
    padding: 10,
  },
});
