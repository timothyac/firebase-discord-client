import { db } from "../firebase";
import { refreshTokens } from "./auth";

const GET_GUILDS = process.env.REACT_APP_GET_GUILDS as string;

export const requestUserGuild = async (uid: string) => {
  try {
    // Get user token
    const doc = await db.collection("users").doc(uid).get();

    // Get user's guilds
    const res = await fetch(GET_GUILDS, {
      headers: {
        Authorization: `Bearer ${doc.data()?.tokens.access_token}`,
      },
    });

    const json = await res.json();

    // Check if refresh token is broken
    if (json.message === "401: Unauthorized") {
      refreshTokens(uid)
        // Store tokens in firestore
        .then((json) => db.collection("users").doc(uid).set({ tokens: json }))
        .catch((err) => Promise.reject(err));
    }

    return json;
  } catch (error) {
    return new Error(error);
  }
};
