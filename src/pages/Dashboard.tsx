import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { auth, db } from "../firebase";
import { AuthStateContext } from "../context/AuthContext";
import { requestTokens } from "../utils/auth";
import { requestUserGuild } from "../utils/discord";

const OAUTH_URL = process.env.REACT_APP_OAUTH_URL as string;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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

const Guilds = ({ uid }: { uid: string }) => {
  const [guilds, setGuilds] = useState([]);

  const loadUsersGuilds = async () => {
    try {
      // Get user doc
      const doc = await db.collection("users").doc(uid).get();

      // Get user guilds
      const guilds = await doc.data()?.guilds;

      // Check to see if it is empty
      if (!guilds || guilds.length === 0) {
        requestUserGuild(uid)
          // Save the guilds in the database
          .then((guilds) => {
            db.collection("users").doc(uid).update({ guilds });
            return guilds;
          })
          // Store the user's guilds in state
          .then((guilds) => setGuilds(guilds))
          .catch((err) => alert(err));
      } else {
        setGuilds(guilds);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    loadUsersGuilds();
  }, []);

  return (
    <>
      {guilds.length !== 0 &&
        guilds.map(({ id, name }) => <div key={id}>{name}</div>)}
    </>
  );
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
      <a href={OAUTH_URL}>
        <button>Discord Login</button>
      </a>
      {query.get("code") && <em>Saving Token</em>}
      <Guilds uid={uid} />
    </div>
  );
};

export default Dashboard;
