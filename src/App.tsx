import React, { useEffect, useState } from "react";
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
  const [loading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsAuthenticated(false);
  }, [setIsLoading]);

  return (
    <>
      {loading && (
        <AppStyled>
          <AuthProvider tokensValid={isAuthenticated}>
            <Router>
              <Routes />
            </Router>
          </AuthProvider>
        </AppStyled>
      )}
    </>
  );
};

export default App;
