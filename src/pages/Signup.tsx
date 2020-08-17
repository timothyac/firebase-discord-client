import React, { useState } from "react";
// @ts-ignore
import { auth, db } from "../firebase";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!username || !password)
        throw Error("Missing username and/or password");

      // Create user
      const { user } = await auth.createUserWithEmailAndPassword(
        username,
        password
      );

      // Save something to DB
      await db.collection("users").doc(user?.uid).set({
        testField: "value123",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <span>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <span>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
