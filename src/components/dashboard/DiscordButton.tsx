import React from "react";
import styled from "styled-components";

const OAUTH_URL = process.env.REACT_APP_OAUTH_URL as string;

const DiscordButtonStyled = styled.a`
  button {
    background: #7289da;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    height: 50px;
    min-width: 150px;
    padding: 0 12px;
    transition: filter 0.15s ease-in, box-shadow 0.15s ease-in;

    &:hover {
      cursor: pointer;
      filter: brightness(0.95);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
`;

const DiscordButton = () => {
  return (
    <DiscordButtonStyled href={OAUTH_URL}>
      <button>Sign in with Discord</button>
    </DiscordButtonStyled>
  );
};

export default DiscordButton;
