import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { getDocument } from "@/api/db";
import { useAuth } from "@/contexts/AuthContext";
import AddClass from "@/components/AddClass";
import { LinearGradient } from "tamagui/linear-gradient";
import { Input, Button, Text, View, H1, H2, H3, Progress } from "tamagui";
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
      <H2 style={styles.Points}>Points: {data.total_class_count}</H2>
      <GradientBarGraph />
      <AddClass />
      <Progress
        value={data.total_class_count / data.total_class_points}
        style={styles.Progress}
      >
        <Progress.Indicator
          animation="bouncy"
          style={styles.progressIndicator}
        />
      </Progress>
    </View>
  );
};

const styles = StyleSheet.create({
  Points: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
  Progress: {
    marginTop: 20,
    backgroundColor: "#434343",
  },
  progressIndicator: {
    backgroundColor: "green",
  },
});

export default HomeScreen;
