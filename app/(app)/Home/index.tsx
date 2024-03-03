import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getDocument } from "@/api/db";
import { useAuth } from "@/contexts/AuthContext";
import AddClass from "@/components/AddClass";
import { LinearGradient } from "tamagui/linear-gradient";
import { Input, Button, Text, View, H1, H2, H3 } from "tamagui";
import GradientBarGraph from "@/components/barGraph";

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<DocumentData>({});
  const { currentUser } = useAuth();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDocument("users", currentUser!.uid);
        if (!fetchedData) throw new Error("No data found!");
        setData(fetchedData);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      <H3>Welcome {data.username}!</H3>
      <GradientBarGraph />
      <AddClass />
    </View>
  );
};

export default HomeScreen;
