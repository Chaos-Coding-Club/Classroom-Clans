import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'tamagui';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Text>Welcome to the Settings Screen!</Text>
      <Button onPress={() => console.log('Button clicked!')}>Click Me!</Button>
    </View>
  );
};

export default HomeScreen;