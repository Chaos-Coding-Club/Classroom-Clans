import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { getDocument } from "@/api/db";
import { useAuth } from "@/contexts/AuthContext";

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<DocumentData>({});
  const { currentUser } = useAuth();

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
      <Text>Welcome {data.username}!</Text>
    </View>
  );
};

export default HomeScreen;
