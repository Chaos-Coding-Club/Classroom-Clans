import { DataPoint, GradientBarGraph } from "@components/barGraph";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, H3 } from "tamagui";

import { getCollection, getDocument } from "@/api/db";
import AddClass from "@/components/AddClass";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";

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
        </>
      )}
    </View>
  );
};

export default HomeScreen;
