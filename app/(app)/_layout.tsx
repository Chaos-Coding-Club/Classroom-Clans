import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, useColorScheme } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function AppLayout() {
  const auth = useAuth();
  const colorScheme = useColorScheme();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  if (!auth.currentUser) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/Login/" />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerTintColor: colorScheme === "light" ? "black" : "white",
        }}
        initialRouteName="Home/index"
      >
        <Drawer.Screen
          name="Home/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />

        <Drawer.Screen
          name="FindClan/index"
          options={{
            drawerLabel: "Find Clan",
            title: "Find Clan",
          }}
        />
        <Drawer.Screen
          name="CreateClan/index"
          options={{
            drawerLabel: "Create A Clan",
            title: "Create A Clan",
          }}
        />
        <Drawer.Screen
          name="Settings/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
