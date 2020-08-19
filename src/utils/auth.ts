import { db } from "../firebase";

const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;
const REFRESH_TOKEN_URL = process.env.REACT_APP_REFRESH_TOKEN_URL;

/**
 * Request tokens from Discord.
 *
 * @param code access code
 */
export const requestTokens = async (code: string) => {
  try {
    // Request access code from Discord
    const res = await fetch(`${TOKEN_URL}?code=${code}`, {
      method: "POST",
    });

    const json = await res.json();

    // Check for error message from function
    if (json.error) return Promise.reject(json.error_description);

    return json;
  } catch (error) {
    return new Error(error);
  }
};

/**
 * Refresh the tokens from Discord.
 *
 * @param refresh_token refresh token
 */
export const refreshTokens = async (uid: string) => {
  try {
    // Get user token
    const doc = await db.collection("users").doc(uid).get();

    // Request access code from Discord
    const res = await fetch(
      `${REFRESH_TOKEN_URL}?refresh_token=${doc.data()?.refresh_token}`,
      {
        method: "POST",
      }
    );

    const json = await res.json();

    // Check for error message from function
    if (json.error) return Promise.reject(json.error_description);

    return json;
  } catch (error) {
    return new Error(error);
  }
};
