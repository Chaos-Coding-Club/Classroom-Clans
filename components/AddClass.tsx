import { Check } from "@tamagui/lucide-icons";
import { Sheet } from "@tamagui/sheet";
import * as Location from "expo-location";
import { GeoPoint, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";
import { Button, YStack, Input, View, H3, XStack } from "tamagui";

import { DateTimePicker } from "./DateTimePicker";
import DismissKeyboard from "./DismissKeyboard";

import {
  addDocument,
  getDocument,
  setDocument,
  updateDocument,
} from "@/api/db";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "./Loading";

export const AddClass: React.FC<{ onRefresh: () => void }> = ({
  onRefresh,
}) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [frequency, setFrequency] = useState("0");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const snapPoints = [85, 60];

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setClassName(e.nativeEvent.text);
  };

  const handleFreqChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newFrequency = parseInt(e.nativeEvent.text, 10) || 0;
    setFrequency(e.nativeEvent.text);
    setDates((currentDates) => {
      const newDates = currentDates.slice(0, newFrequency);
      for (let i = currentDates.length; i < newFrequency; i++) {
        newDates.push(new Date());
      }
      return newDates;
    });
  };

  const handleDateChange = (index: number, newDate: Date) => {
    setDates((currentDates) => {
      const newDates = [...currentDates];
      newDates[index] = newDate;
      return newDates;
    });
  };

  const getClassTimes = () => {
    return Array.from({ length: parseInt(frequency, 10) || 0 }, (_, i) => (
      <React.Fragment key={i}>
        <H3 style={styles.header}>Enter A Class Day {i + 1}</H3>
        <DateTimePicker
          onDateChange={(newDate) => handleDateChange(i, newDate)}
        />
      </React.Fragment>
    ));
  };

  const dismissAll = (o: boolean) => {
    setOpen(!open);
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    setClassName("");
    setDates([]);
    setFrequency("0");
    setLocation(null);
    setLoading(false);
  };

  const handleLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await setDocument(`users/${currentUser!.uid}/classes`, className, {
        class_name: className,
        counter: 0,
        days: dates,
        location: new GeoPoint(
          location!.coords.latitude,
          location!.coords.longitude,
        ),
        total_count: parseInt(frequency, 10),
      });
      const user = await getDocument("users", currentUser!.uid);
      if (!user) throw new Error("No data found!");
      await updateDocument("users", currentUser!.uid, {
        total_class_points: user.total_class_points + dates.length,
      });
      setLoading(false);
      dismissAll(open);
      onRefresh();
    } catch (error) {
      console.error(error);
      dismissAll(open);
    }
  };

  return (
    <>
      <YStack space>
        <Button
          style={styles.AddClass}
          theme="Button"
          onPress={() => setOpen(true)}
        >
          Add Class
        </Button>
      </YStack>
      <Sheet
        open={open}
        onOpenChange={dismissAll}
        snapPoints={snapPoints}
        modal
        snapPointsMode="percent"
        dismissOnSnapToBottom
        moveOnKeyboardChange
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />

        <Sheet.Frame style={styles.sheetFrame}>
          <Sheet.ScrollView>
            <DismissKeyboard>
              <View flex={1} style={styles.form}>
                <H3 style={styles.header}>Enter A Class Name</H3>
                <Input
                  theme="Input"
                  placeholder="Class Name"
                  style={styles.input}
                  onChange={handleNameChange}
                  value={className}
                />
                <H3 style={styles.header}>Enter The Class Frequency</H3>
                <Input
                  theme="Input"
                  keyboardType="numeric"
                  placeholder="Class Frequency"
                  style={styles.input}
                  onChange={handleFreqChange}
                  value={frequency.toString()}
                />
                {getClassTimes()}
                <H3 style={styles.header}>Set Class Location</H3>
                <XStack alignItems="center" width="100%" gap={15}>
                  <Button onPress={handleLocation}>Get Location</Button>
                  {location && <Check size={24} color="$green11Dark" />}
                </XStack>
                <Button
                  onPress={handleSubmit}
                  marginTop={30}
                  disabled={
                    !!(
                      dates.length === 0 ||
                      className === "" ||
                      frequency === "0" ||
                      frequency === "" ||
                      location === null
                    )
                  }
                  color={
                    dates.length === 0 ||
                    className === "" ||
                    frequency === "0" ||
                    frequency === "" ||
                    location === null
                      ? "gray"
                      : "$green11"
                  }
                >
                  {loading ? <Loading /> : "Submit"}
                </Button>
              </View>
            </DismissKeyboard>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
  sheetFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%", // Ensure the form takes the full width available
    alignItems: "flex-start",
    padding: 20,
  },
  header: {
    marginBottom: 20, // Add some space below the header
  },
  input: {
    width: "100%", // Ensure the input takes the full width available
  },
  AddClass: {
    marginTop: 20,
    width: "75%",
    alignSelf: "center", // Align the button to the center horizontally
    backgroundColor: "#007AFF",
    shadowColor: "#0055b3",
    color: "#FFFFFF", // Set text color to white
  },
});

export default AddClass;
