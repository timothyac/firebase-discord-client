import React, { useEffect, useState, useContext } from "react";

import { auth, db } from "../firebase";
import { AuthStateContext } from "../context/AuthContext";

const Dashboard = () => {
  // Get user's unique ID
  const { uid } = useContext(AuthStateContext);
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

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{id}</pre>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <a href="https://discord.com/api/oauth2/authorize?client_id=744685186335244299&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code&scope=identify%20email">
        <button>Discord Login</button>
      </a>
    </div>
  );
};

export default Dashboard;
