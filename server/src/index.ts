import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { RtcTokenBuilder, RtcRole } from "agora-access-token";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT!);
const APP_ID = process.env.AGORA_APP_ID!;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;

app.use(express.json());
app.use(cors());

app.get("/api/rtc", (req, res) => {
  const channelName = "main";
  const userId = Number(req.query.userId);
  const expiry = 600;
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    userId,
    RtcRole.PUBLISHER,
    expiry
  );

  return res.status(200).json({ token });
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
