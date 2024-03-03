import { DataPoint, GradientBarGraph } from "@components/barGraph";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getCollection, getDocument } from "@/api/db";
import AddClass from "@/components/AddClass";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, useColorScheme } from "react-native";
import { View, H2, H3, Progress } from "tamagui";


const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<DocumentData>({});
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<DataPoint[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userDataTemp = await getDocument("users", currentUser!.uid);
        if (!userDataTemp) throw new Error("No data found!");
        setUserData(userDataTemp);
        const classData = await getCollection("users", [
          currentUser!.uid,
          "classes",
        ]);
        if (!classData) throw new Error("No data found!");
        const tempData: DataPoint[] = [];
        classData.forEach((value) => {
          tempData.push({
            value: Math.round((value.counter / value.total_count) * 100),
            label: value.class_name,
          });
        });
        setGraphData(tempData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View flex={1}>
      {loading ? (
        <View flex={1} justifyContent="center" alignItems="center">
          <Loading size="large" />
        </View>
      ) : (
        <>
          <H3>Welcome {userData.username}!</H3>
          <GradientBarGraph data={graphData} />
          <AddClass />
          <Progress
            value={userData.total_class_count / userData.total_class_points}
            style={styles.Progress}
          >
            <Progress.Indicator
              animation="bouncy"
              style={styles.progressIndicator}
            />
          </Progress>
        </>
      )}
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
