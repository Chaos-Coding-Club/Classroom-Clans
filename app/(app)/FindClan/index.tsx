import React from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text, H1, H2, H6, Card, Input, YStack } from "tamagui";
import type { CardProps } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import DismissKeyboard from "@/components/DismissKeyboard";

const FindClan: React.FC = () => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <H6 style={styles.header}>
          Find a clan to join and start playing with friends!
        </H6>
        <Card size="$4" width={250} height={300} style={styles.card}>
          <LinearGradient
            id="gradient"
            colors={["$green6", "$background"]}
            style={{ flex: 1 }}
          >
            <View>
              <Input placeholder={"Clan Name"} style={styles.form}></Input>
              <Button style={styles.button}> Submit</Button>
            </View>
          </LinearGradient>
        </Card>
      </View>
    </DismissKeyboard>
  );
};

export default FindClan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  form: {
    alignItems: "center",
    marginTop: "50%",
    width: "100%",
  },
  card: {
    borderRadius: 100,
    width: "100%",
    flex: 1,
  },
});
