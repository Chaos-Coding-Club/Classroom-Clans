import { DataPoint, GradientBarGraph } from "@components/barGraph";
import * as Location from "expo-location";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, H2, H3, H6, Progress, XStack, Button } from "tamagui";

import { getCollection, getDocument, updateDocument } from "@/api/db";
import AddClass from "@/components/AddClass";
import { Loading } from "@/components/Loading";
import { SelectDemoItem } from "@/components/SelectItem";
import { useAuth } from "@/contexts/AuthContext";
import { CustomAlertDialog } from "@/components/AlertDialog";
import Leaderboard from "@/components/Leaderboard";

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<DocumentData>({});
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<DataPoint[]>([]);
  const [classData, setClassData] = useState<DocumentData[]>([]);
  const [selectData, setSelectData] = useState<{ name: string }[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loadingClass, setLoadingClass] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [error, setError] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { currentUser } = useAuth();

  const handleAlert = () => setIsAlertOpen(!isAlertOpen);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resUser = await getDocument("users", currentUser!.uid);
      if (!resUser) throw new Error("No data found!");
      setUserData(resUser);
      const resClass = await getCollection("users", [
        currentUser!.uid,
        "classes",
      ]);
      if (!resClass) throw new Error("No data found!");
      const tempGraphData: DataPoint[] = [];
      const tempSelectData: { name: string }[] = [];
      const tempClassData: DocumentData[] = [];
      resClass.forEach((value) => {
        tempGraphData.push({
          value: Math.round((value.counter / value.total_count) * 100),
          label: value.class_name,
        });
        tempSelectData.push({ name: value.class_name });
        tempClassData.push(value);
      });
      setGraphData(tempGraphData);
      setSelectData(tempSelectData);
      setClassData(tempClassData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  const handleUpdateClass = async () => {
    try {
      const index = classData.findIndex((value) => {
        if (value.class_name === selectedClass) return true;
      });
      if (location === null) {
        await getLocation();
      } else if (
        Math.abs(
          location.coords.latitude - classData[index].location.latitude,
        ) > 0.0005 ||
        Math.abs(
          location.coords.longitude - classData[index].location.longitude,
        ) > 0.0005
      ) {
        setError("Location is not close enough to check in!");
        handleAlert();
        return;
      }
      let err = true;
      classData[index].days.forEach((value: any) => {
        const time = new Date(value.seconds * 1000);
        if (
          time.getDay() === new Date().getDay() &&
          time.getHours() === new Date().getHours() &&
          time.getMinutes() === new Date().getMinutes()
        ) {
          err = false;
        }
      });
      if (err) {
        setError("Class at not available at this time!");
        handleAlert();
        return;
      }
      setLoadingClass(true);
      await updateDocument("users", currentUser!.uid, {
        total_class_count:
          (userData.total_class_count + 1) % (userData.total_class_points + 1),
      });
      await updateDocument(`users/${currentUser!.uid}/classes`, selectedClass, {
        counter:
          (classData[index].counter + 1) % (classData[index].total_count + 1),
      });
      await fetchData();
      setError("");
      setLoadingClass(false);
    } catch (error) {
      console.error("Failed to update class: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    setError("");
  }, []);

  return (
    <View style={styles.generalHome}>
      {loading ? (
        <View flex={1} justifyContent="center" alignItems="center">
          <Loading size="large" />
        </View>
      ) : (
        <>
          <View style={styles.generalHome}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <H3>Welcome {userData.username}!</H3>
              <H2 style={styles.Points}>
                Points: {userData.total_class_count}
              </H2>
              <GradientBarGraph data={graphData} />

              <H6>Check In:</H6>
              <XStack
                justifyContent="center"
                alignItems="center"
                width="100%"
                gap={15}
              >
                <SelectDemoItem
                  items={selectData}
                  updateSelected={setSelectedClass}
                  defaultValue={selectedClass}
                />
                <Button
                  onPress={handleUpdateClass}
                  disabled={selectedClass === ""}
                  color={
                    selectedClass === ""
                      ? "$gray11"
                      : error !== ""
                        ? "$red11"
                        : "$green11"
                  }
                >
                  {loadingClass ? <Loading /> : "Submit"}
                </Button>
                {error !== "" ? (
                  <CustomAlertDialog
                    title="Error"
                    description={error}
                    isOpen={isAlertOpen}
                    onClose={handleAlert}
                  />
                ) : null}
              </XStack>
              <H6>Add Another Class:</H6>
              <AddClass onRefresh={fetchData} />
              <View style={styles.progressView}>
                <H6>Weekly Progress:</H6>
                <Progress
                  value={Math.round(
                    (userData.total_class_count / userData.total_class_points) *
                      100,
                  )}
                  style={styles.Progress}
                >
                  <Progress.Indicator
                    animation="bouncy"
                    style={styles.progressIndicator}
                  />
                </Progress>
              </View>
              <H6 style={styles.Leaderboard}>Leaderboard:</H6>
              <Leaderboard />
            </ScrollView>
          </View>
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
    backgroundColor: "#434343",
  },
  progressIndicator: {
    backgroundColor: "green",
  },

  progressView: {
    marginTop: 20,
  },

  Leaderboard: {
    marginTop: 20,
    textAlign: "left",
  },

  generalHome: {
    padding: 20,
    flex: 1,
  },
});

export default HomeScreen;
