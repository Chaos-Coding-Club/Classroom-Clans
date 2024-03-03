import React from "react";
import { Card, Text, YStack, XStack, ScrollView, View } from "tamagui";

// Mock data for the leaderboard
const users = [
  { id: 1, username: "UserOne", rank: 1 },
  { id: 2, username: "UserTwo", rank: 2 },
  { id: 3, username: "UserThree", rank: 3 },
  { id: 4, username: "UserFour", rank: 3 },
  { id: 5, username: "UserFive", rank: 3 },
  { id: 6, username: "UserSix", rank: 3 },
];

const Leaderboard: React.FC = () => {
  return (
    <View flex={1}>
      <ScrollView flex={1} maxHeight={"250%"}>
        <YStack gap={20} padding="$4">
          {users.map((user) => (
            <Card key={user.id} padding="$4">
              <XStack alignItems="center" gap="$4">
                <Text fontWeight="bold">{user.username}</Text>
                <Text>Rank: {user.rank}</Text>
              </XStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </View>
  );
};

export default Leaderboard;
