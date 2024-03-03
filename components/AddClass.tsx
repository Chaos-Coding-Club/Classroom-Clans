import DismissKeyboard from "@components/DismissKeyboard";
import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, YStack, Input, View, H3 } from "tamagui";

export const AddClass = () => {
  const [open, setOpen] = useState(false);
  const snapPoints = [65, 50]; // Define snap points

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
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        modal // Always in inline mode
        snapPointsMode="percent"
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />

        <Sheet.Frame style={styles.sheetFrame}>
          <View style={styles.form}>
            <H3 style={styles.header}>Enter A Class Name</H3>
            <Input
              theme="Input"
              placeholder="Class Name"
              style={styles.input}
            />
          </View>
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
    alignItems: "center", // Center the items horizontally
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
