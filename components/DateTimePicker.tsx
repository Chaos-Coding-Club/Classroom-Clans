import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, XStack } from "tamagui";

const DateTimePicker: React.FC<{ onDateChange: (date: Date) => void }> = ({
  onDateChange,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    const currentDate = selectedDate ?? new Date();
    currentDate.setSeconds(0);
    setDate(currentDate);
    setShow(false);
    onDateChange(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <XStack justifyContent="space-around" width="100%">
        <Button onPress={showDatepicker}>Select Date</Button>
        <Button onPress={showTimepicker}>Select Time</Button>
      </XStack>
      <Text style={styles.text}>Selected: {date.toLocaleString()}</Text>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
  },
});

export { DateTimePicker };
