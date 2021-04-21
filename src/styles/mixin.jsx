/* eslint-disable prettier/prettier */
import { css } from "styled-components";
import { theme } from "./theme";
export const breakpoint = {
  mobileS: `(max-width: 320px)`,
  mobileL: `(max-width: 425px)`,
  tabletS: `(max-width: 815px)`,
  tabletL: `(max-width: 1024px)`,
  desktop: `(min-width: 500px)`,
};

export const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexEven: css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,

  borderR: css`
    border-radius: 1rem;
  `,
  maxWidth: css`
    width: 100%;
    max-width: 800px;
    min-width: 315px;
    margin: auto;
  `,
  transition: css`
    transition: all 0.3s ease-in-out;
  `,
};
