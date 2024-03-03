import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";
import { View, Button, Text, H1, H2, H6, Card, Input, YStack } from "tamagui";
import type { CardProps } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import DismissKeyboard from "@/components/DismissKeyboard";
import { Loading } from "@/components/Loading";
import { getDocument, getUserDocRef, updateDocument } from "@/api/db";
import { useAuth } from "@/contexts/AuthContext";

const FindClan: React.FC = () => {
  const [clanName, setClanName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => setClanName(e.nativeEvent.text);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userRef = getUserDocRef(currentUser!.uid);
      const curClan = await getDocument("clans", clanName);
      const tempUsers = [...curClan?.users, userRef] || [];
      console.log(curClan, tempUsers);
      await updateDocument(`clans`, clanName, {
        users: tempUsers,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <LinearGradient
        id="gradient"
        colors={["$green6", "$background"]}
        style={{ flex: 1, padding: 0, margin: 0 }}
      >
        <View style={styles.container}>
          <H6 style={styles.header}>
            Find a clan to join and start playing with friends!
          </H6>
          <View style={{ width: "100%" }}>
            <Input
              placeholder="Clan Name"
              style={styles.form}
              onChange={handleNameChange}
              value={clanName}
            />
            <Button style={styles.button} onPress={handleSubmit}>
              {loading ? <Loading /> : "Submit"}
            </Button>
          </View>
        </View>
      </LinearGradient>
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
