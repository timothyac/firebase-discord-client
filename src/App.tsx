import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./router/Routes";
import { AuthProvider } from "./context/AuthProvider";

const AppStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <AppStyled>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </AppStyled>
  );
};

export default App;
