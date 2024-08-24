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
import { getAgoraToken } from "@/lib/axios";

const appId = process.env.EXPO_PUBLIC_APP_ID;
const channelName = "main";
const userId = Math.floor(Math.random() * 10_000_000);

const initialState = {
  joinChannel: () => {},
  leaveChannel: () => {},
  otherJoinee: [] as number[],
  isJoined: false,
  message: "",
  userId,
  loading: false,
};

export const agoraContext = createContext(initialState);

export const AgoraProvider = ({ children }: PropsWithChildren) => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [otherJoinee, setOtherJoinee] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        onError: (_, err) => setMessage(err),
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
    } catch (err: any) {
      console.log(err);
      setMessage(err.message);
    }
  };

  const joinChannel = async () => {
    setLoading(true);
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting
      );

      const { data: token, error } = await getAgoraToken(userId);
      if (error) return setMessage(error);
      if (token) console.log(token);

      agoraEngineRef.current?.joinChannel(token, channelName, userId, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      setOtherJoinee((prev) => [...prev, userId]);
      setIsJoined(true);
      setMessage(`Successfully joined ${channelName}`);
    } catch (err: any) {
      console.log(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const leaveChannel = () => {
    setLoading(true);
    try {
      agoraEngineRef.current?.leaveChannel();
      setOtherJoinee([]);
      setIsJoined(false);
      setMessage("You Left the channel");
    } catch (err: any) {
      console.log(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <agoraContext.Provider
      value={{
        isJoined,
        joinChannel,
        leaveChannel,
        message,
        otherJoinee,
        userId,
        loading,
      }}
    >
      {children}
    </agoraContext.Provider>
  );
};
