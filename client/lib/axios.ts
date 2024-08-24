import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_SERVER_URL}/api`,
});

export async function getAgoraToken(uid: number) {
  try {
    const { data } = await client.get("/token", {
      params: { uid },
    });
    return {
      data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message,
    };
  }
}
