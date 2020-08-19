import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { auth, db } from "../firebase";
import { AuthStateContext } from "../context/AuthContext";
import { requestTokens } from "../utils/auth";
import { useQuery } from "../utils/useQuery";

import Guilds from "../components/dashboard/Guilds";
import DiscordButton from "../components/dashboard/DiscordButton";

const realCode = (code: string) => /^[a-zA-Z0-9]{30}$/.test(code);

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
      .then((json) => db.collection("users").doc(uid).set({ tokens: json }))
      // Redirect to dashboard
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        if (err === 'Invalid "code" in request.') {
          // Send back to dashboard
          history.push("/dashboard");
        } else {
          alert(err);
        }
      });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <UserId uid={uid} />
      <button onClick={() => auth.signOut()}>Sign out</button>
      <DiscordButton />
      {query.get("code") && <em>Saving Token</em>}
      <Guilds uid={uid} />
    </div>
  );
};

export default Dashboard;
