import React from "react";

import { auth } from "../firebase";

const Dashboard = () => {
  const signOut = () => auth.signOut();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;
