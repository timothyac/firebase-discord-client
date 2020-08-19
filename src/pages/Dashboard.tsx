import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { auth, db } from "../firebase";
import { AuthStateContext } from "../context/AuthContext";
import { refreshTokens, requestTokens } from "../utils/auth";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const realCode = (code: string) => /^[a-zA-Z0-9]{30}$/.test(code);

const DISC_API = "https://discord.com/api/";
const OAUTH_URL = `${DISC_API}oauth2/authorize?client_id=744685186335244299&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code&scope=identify%20guilds`;
const GET_GUILDS = `${DISC_API}users/@me/guilds`;

const requestUser = async (uid: string) => {
  try {
    // Get user token
    const doc = await db.collection("users").doc(uid).get();

    // Get user's guilds
    const res = await fetch(GET_GUILDS, {
      headers: {
        Authorization: `Bearer ${doc.data()?.access_token}`,
      },
    });

    const json = await res.json();

    // Check if refresh token is broken
    if (json.message === "401: Unauthorized") {
      refreshTokens(uid)
        // Store tokens in firestore
        .then((json) => db.collection("users").doc(uid).set(json))
        .catch((err) => Promise.reject(err));
    }

    return json;
  } catch (error) {
    return new Error(error);
  }
};

const UserId = ({ uid }: { uid: string }) => {
  const [id, setId] = useState(null);

  // Get user data from Firebase
  const getUserData = async () => {
    try {
      const doc = await db.collection("users").doc(uid).get();

      // Check if user doc exists
      if (doc.exists) setId(doc.data()?.testField);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <pre>{id}</pre>;
};

const Dashboard = () => {
  // Get user's unique ID
  const { uid } = useContext(AuthStateContext);
  let history = useHistory();
  const query = useQuery();
  const code = query.get("code") as string;

  // Check for valid access code
  if (code && realCode(code)) {
    requestTokens(code)
      // Store tokens in firestore
      .then((json) => db.collection("users").doc(uid).set(json))
      // Redirect to dashboard
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        if (err === 'Invalid "code" in request.') {
          // Send back to dashboard
          history.push("/dashboard");
        } else {
          console.error(err);
          alert(err);
        }
      });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <UserId uid={uid} />
      <button onClick={() => auth.signOut()}>Sign out</button>
      <a href={OAUTH_URL}>
        <button>Discord Login</button>
      </a>
      {query.get("code") && <em>Saving Token</em>}
      <button onClick={() => requestUser(uid)}>Get Guilds</button>
    </div>
  );
};

export default Dashboard;
