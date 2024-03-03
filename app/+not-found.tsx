import { Link, Stack, usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text } from "tamagui";

export default function NotFoundScreen() {
  const pathname = usePathname();
  // console.log('Not found at:', pathname);
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View margin={10}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/(app)/Home" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
