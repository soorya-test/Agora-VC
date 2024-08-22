import ThemeProvider from "./ThemeProvider";
import AgoraProvider from "./AgoraProvider";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AgoraProvider>{children}</AgoraProvider>
    </ThemeProvider>
  );
}
