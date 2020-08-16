import * as firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";

import "firebase/auth";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
