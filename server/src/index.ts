import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { RtcTokenBuilder, RtcRole } from "agora-access-token";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT!);
const APP_ID = process.env.AGORA_APP_ID!;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;

app.use(express.json());
app.disable("x-powered-by");
app.use(cors());

const api = Router();

api.get("/health", (_, res) => {
  res.status(200).json({
    status: true,
  });
});

api.get("/token", (req, res) => {
  const channelName = "main" as const;
  const uid = Number(req.query.uid);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiry = currentTimestamp + 3600;
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    expiry
  );

  return res.status(200).json({ token });
});

app.use("/api", api);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
