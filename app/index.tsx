import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAgora } from "@/hooks/use-agora";

export default function HomePage() {
  const { dark: isDark } = useTheme();
  const { message, isJoined, joinChannel, leaveChannel, otherJoinee } =
    useAgora();
  const styles = generateStyles(isDark);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.main}>
        {isJoined ? (
          <TouchableOpacity onPress={leaveChannel} style={styles.container}>
            <View style={styles.button}>
              <MaterialCommunityIcons
                name="logout"
                size={30}
                color={isDark ? "black" : "white"}
              />
            </View>
            <View>
              <Text style={styles.buttonText}>Leave</Text>
              <Text style={styles.buttonText}>Channel</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={joinChannel} style={styles.container}>
            <View style={styles.button}>
              <MaterialCommunityIcons
                name="login"
                size={30}
                color={isDark ? "black" : "white"}
              />
            </View>
            <View>
              <Text style={styles.buttonText}>Join</Text>
              <Text style={styles.buttonText}>Channel</Text>
            </View>
          </TouchableOpacity>
        )}
        {message && (
          <View style={styles.toast}>
            <MaterialCommunityIcons
              name="information-outline"
              size={30}
              color={isDark ? "black" : "white"}
            />
            <Text style={styles.buttonText}>{message}</Text>
          </View>
        )}
        <Text style={styles.head}>Joined Members</Text>
        <View style={styles.grid}>
          {otherJoinee.map(
            (j, idx) =>
              j && (
                <Text style={styles.text} key={idx}>
                  {`${idx + 1}. ${j.toString().substring(0, 3)}....${j
                    .toString()
                    .substring(j.toString().length - 3, j.toString().length)}`}
                </Text>
              )
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const generateStyles = (isDark: boolean) =>
  StyleSheet.create({
    main: {
      alignItems: "center",
      flex: 1,
      paddingVertical: 20,
      gap: 16,
    },
    toast: {
      width: "90%",
      flexDirection: "row",
      height: 48,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: isDark ? "white" : "black",
      gap: 10,
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      borderWidth: 2,
      borderColor: isDark ? "white" : "black",
      paddingHorizontal: 20,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: isDark ? "white" : "black",
    },
    button: {
      aspectRatio: 1 / 1,
      paddingTop: 12,
    },
    buttonText: {
      fontSize: 18,
      color: isDark ? "black" : "white",
      textAlign: "left",
      alignSelf: "center",
    },
    head: {
      fontSize: 25,
      color: isDark ? "white" : "black",
      textAlign: "center",
      alignSelf: "center",
    },
    grid: {
      justifyContent: "center",
      alignItems: "center",
      rowGap: 8,
    },
    text: {
      fontSize: 20,
      color: isDark ? "white" : "black",
      textAlign: "left",
      fontFamily: "SpaceMono",
    },
  });
