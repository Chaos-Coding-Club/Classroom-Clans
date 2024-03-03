import React, { useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Button, Text, View } from 'tamagui';
import { register } from '@/api/auth';
import { Link, router } from 'expo-router';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(e.nativeEvent.text);
  };

  const handlePasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  };

  const handleRegister = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      router.replace('/(app)/Home');
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <View>
      <Text>Register Page</Text>
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
      <Button onPress={handleRegister}>Register</Button>
      <Link href="/(app)/Home" >
        <Text >Already have an account? Login here!</Text>
      </Link>
    </View>
  );
};

export default RegisterPage;