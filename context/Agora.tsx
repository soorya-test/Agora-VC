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

import { getAudioPermission } from "@/utils/permissions";

const appId = process.env.EXPO_PUBLIC_APP_ID;
const token = "";
const channelName = "main";
const uid = Math.floor(Math.random() * (Math.pow(2, 32) - 1));

const initialState = {
  joinChannel: () => {},
  leaveChannel: () => {},
  otherJoinee: [] as number[],
  isJoined: false,
  message: "",
};

export const agoraContext = createContext(initialState);

export const AgoraProvider = ({ children }: PropsWithChildren) => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [otherJoinee, setOtherJoinee] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    initFunc();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  const initFunc = async () => {
    try {
      await getAudioPermission();
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          setMessage(`Successfully joined ${channelName}`);
          setIsJoined(true);
        },
        onUserJoined: (_, uid) => {
          setMessage(`User ${uid} has joined`);
          setOtherJoinee((prev) => [...prev, uid]);
        },
        onUserOffline: (_, uid) => {
          setMessage(`User ${uid} has left`);
          setOtherJoinee((prev) => prev.filter((id) => id != uid));
        },
      });

      agoraEngine.initialize({
        appId,
      });
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setMessage(err.message);
    }
  };

  const joinChannel = () => {
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setMessage(err.message);
    }
  };

  const leaveChannel = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setOtherJoinee([]);
      setIsJoined(false);
      setMessage("You Left the channel");
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setMessage(err.message);
    }
  };

  return (
    <agoraContext.Provider
      value={{ isJoined, joinChannel, leaveChannel, message, otherJoinee }}
    >
      {children}
    </agoraContext.Provider>
  );
};
