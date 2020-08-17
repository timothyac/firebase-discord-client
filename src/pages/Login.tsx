import React, { useState } from "react";
// @ts-ignore
import { auth } from "../firebase";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!username || !password)
        throw Error("Missing username and/or password");

      await auth.signInWithEmailAndPassword(username, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
