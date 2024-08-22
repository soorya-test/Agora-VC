import { AgoraProvider as AgoraContextProvider } from "@/context/Agora";
import { PropsWithChildren } from "react";

export default function AgoraProvider({ children }: PropsWithChildren) {
  return <AgoraContextProvider>{children}</AgoraContextProvider>;
}
