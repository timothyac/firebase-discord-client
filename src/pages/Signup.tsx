import React from "react";
// @ts-ignore
import { useForm, useField } from "react-form";

import { auth, db } from "../firebase";

interface SubmitProps {
  username: string;
  password: string;
}

const UsernameInput = () => {
  const { getInputProps } = useField("username");

  return <input type="text" {...getInputProps()} />;
};

const PasswordInput = () => {
  const { getInputProps } = useField("password");

  return <input type="password" {...getInputProps()} />;
};

const Signup = () => {
  const { Form } = useForm({
    onSubmit: async ({ username, password }: SubmitProps) => {
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
    },
  });

  return (
    <div>
      <h1>Signup</h1>
      <Form>
        <span>
          Username: <UsernameInput />
        </span>
        <span>
          Password: <PasswordInput />
        </span>
        <button type="submit">Signup</button>
      </Form>
    </div>
  );
};

export default Signup;
