import React from "react";

import { auth } from "../firebase";

const Login = () => {
  const LoginUser = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => LoginUser("sunstrous@gmail.com", "TestPassword")}>
        Login
      </button>
    </div>
  );
};

export default Login;
