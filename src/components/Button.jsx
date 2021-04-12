import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
const Styled__button = styled.button`
  width: 100%;
  padding: 1.2rem 0.8rem;
  border-radius: 2rem;
  background: ${theme.color.primary3};
  color: ${theme.color.secondary1};
  font-size: 1.7rem;
  margin-top: 1.2rem;
  cursor: pointer;
  text-align: center;
`;
function Button({ type, text, onClick }) {
  return (
    <Styled__button onClick={onClick} type={type}>
      {text}
    </Styled__button>
  );
}

export default Button;
