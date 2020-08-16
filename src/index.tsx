import * as firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";

import "firebase/auth";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// These come from https://firebase.google.com/docs/web/setup#config-object
// Storing them in a .ENV is NOT secure, it is for boilerplate convenience
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
