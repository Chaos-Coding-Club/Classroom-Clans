import React from "react";
import { View, Text } from "react-native";
import { Button } from "tamagui";

import { logout } from "@/api/auth";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button onPress={logout}>Log Out!</Button>
    </View>
  );
};

export default HomeScreen;
