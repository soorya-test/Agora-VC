import { getAudioPermission } from "@/utils/permissions";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
} from "react-native-agora";

const appId = process.env.EXPO_PUBLIC_APP_ID;
const token = "<-- Insert Token -->";
const channelName = "<-- Insert Channel Name -->";
const uid = 0;

const initialState = {
  joinChannel: () => {},
  leaveChannel: () => {},
  otherJoinee: [] as number[],
  isJoined: false,
};

export const agoraContext = createContext(initialState);

export const AgoraProvider = ({ children }: PropsWithChildren) => {
  // const agoraEngineRef = useRef<IRtcEngine>();
  // const [isJoined, setIsJoined] = useState(false);
  // const [otherJoinee, setOtherJoinee] = useState<number[]>([]);
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   initFunc();
  // }, []);

  // useEffect(() => {
  //   if (!message) return;
  //   const timeout = setTimeout(() => setMessage(""), 3000);
  //   return () => clearTimeout(timeout);
  // }, [message]);

  // const initFunc = async () => {
  //   await getAudioPermission();
  //   agoraEngineRef.current = createAgoraRtcEngine();
  //   const agoraEngine = agoraEngineRef.current;

  //   agoraEngine.registerEventHandler({
  //     onJoinChannelSuccess: () => {
  //       setMessage(`Successfully joined ${channelName}`);
  //       setIsJoined(true);
  //     },
  //     onUserJoined: (_, uid) => {
  //       setMessage(`User ${uid} has joined`);
  //       setOtherJoinee((prev) => [...prev, uid]);
  //     },
  //     onUserOffline: (_, uid) => {
  //       setMessage(`User ${uid} has left`);
  //       setOtherJoinee((prev) => prev.filter((id) => id != uid));
  //     },
  //   });

  //   agoraEngine.initialize({
  //     appId,
  //   });
  // };

  // const joinChannel = () => {
  //   agoraEngineRef.current?.setChannelProfile(
  //     ChannelProfileType.ChannelProfileCommunication
  //   );
  //   agoraEngineRef.current?.joinChannel(token, channelName, uid, {
  //     clientRoleType: ClientRoleType.ClientRoleBroadcaster,
  //   });
  // };

  // const leaveChannel = () => {
  //   agoraEngineRef.current?.leaveChannel();
  //   setOtherJoinee([]);
  //   setIsJoined(false);
  //   setMessage("You Left the channel");
  // };

  return (
    <agoraContext.Provider value={initialState}>
      {children}
    </agoraContext.Provider>
  );
};
