import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}
body { 
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #EFF2F5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    overflow: scroll;
    color: ${theme.color.primary2};
 
}
html{
    font-size: 10px;
}
a {
    color: inherit;
    text-decoration: none;
}
`;

export default GlobalStyle;
