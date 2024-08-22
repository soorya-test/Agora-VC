import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getAudioPermission } from "@/utils/permissions";

export default function HomePage() {
  const { dark: isDark } = useTheme();
  const styles = generateStyles(isDark);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.main}>
        <View style={styles.toast}>
          <Text style={styles.head}>Alert!!!</Text>
        </View>
        <Text style={styles.head}>Agora Voice Call</Text>
        <Button
          onPress={async () => await getAudioPermission()}
          title="Get Audio"
        />
      </View>
    </ScrollView>
  );
}

const generateStyles = (isDark: boolean) =>
  StyleSheet.create({
    main: {
      alignItems: "center",
      flex: 1,
      paddingVertical: 16,
      position: "relative",
    },
    toast: {
      position: "absolute",
      width: "90%",
      height: 32,
      borderWidth: 2,
      borderColor: "green",
      justifyContent: "center",
      alignItems: "center",
      top: 15,
      opacity: 0,
    },
    head: { fontSize: 22, color: isDark ? "white" : "black" },
  });
