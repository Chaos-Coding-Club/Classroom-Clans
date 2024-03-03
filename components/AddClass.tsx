import DismissKeyboard from "@components/DismissKeyboard";
import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, YStack, Input, View, H3 } from "tamagui";

export const AddClass = () => {
  const [open, setOpen] = useState(false);
  const snapPoints = [256, 190]; // Define snap points

  return (
    <>
      <YStack space>
        <Button theme="Button" onPress={() => setOpen(true)}>
          Add Class
        </Button>
      </YStack>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        modal={false} // Always in inline mode
        dismissOnSnapToBottom
        snapPointsMode="constant"
      >
        <Sheet.Handle />

        <Sheet.Frame style={styles.sheetFrame}>
          <DismissKeyboard>
            <View style={styles.form}>
              <H3 style={styles.header}>Enter A Class Name</H3>
              <Input
                theme="Input"
                placeholder="Class Name"
                style={styles.input}
              />
            </View>
          </DismissKeyboard>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
  sheetFrame: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Add some padding around the content
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
    // Additional styling for the input can be added here
  },
});

export default AddClass;
