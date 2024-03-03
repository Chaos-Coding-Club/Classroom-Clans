import React, { useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Button, Text, View } from 'tamagui';
import { login } from '@/api/auth';
import { Link, router, useRouter } from 'expo-router';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(e.nativeEvent.text);
  };

  const handlePasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  };

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.replace('/(app)/Home');
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <View>
      <Text>Login Page</Text>
      <Input
        placeholder='Email'
        value={email}
        textContentType='emailAddress'
        onChange={handleEmailChange}
      />
      <Input
        placeholder="Password"
        textContentType='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onPress={handleLogin}>Login</Button>
      <Link href="/Register/" >
        <Text >Don't have an account? Register here!</Text>
      </Link>
    </View>
  );
};

export default LoginPage;