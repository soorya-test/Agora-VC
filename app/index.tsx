import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function HomePage() {
  const { dark: isDark } = useTheme();

  const style = StyleSheet.create({
    text: {
      color: isDark ? "white" : "black",
    },
  });

  return (
    <SafeAreaView>
      <View>
        <Text style={style.text}>{isDark ? "True" : "false"}</Text>
      </View>
    </SafeAreaView>
  );
}
