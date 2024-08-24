import { PermissionsAndroid, Platform } from "react-native";

export async function getAudioPermission() {
  if (Platform.OS === "android") {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
  }
}
