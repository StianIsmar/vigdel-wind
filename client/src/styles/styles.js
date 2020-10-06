import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    background-color: #eaeaea;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
width:50%`


export { Global, Wrapper };
