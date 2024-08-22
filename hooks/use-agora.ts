import { agoraContext } from "@/context/Agora";
import { useContext } from "react";

export const useAgora = () => useContext(agoraContext);
