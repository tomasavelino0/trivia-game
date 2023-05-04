import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Main = styled.main`
  align-items: center;
  background-color: #14145a;
  color: #f4f4fb;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  .playButton {
  --color: #f4f4fb; 
  --border: 10px;
  --offset: 30px;
  --gap: 5px;    
  padding: calc(var(--border) + var(--gap));
  border: var(--offset) solid #0000;
  --_m: radial-gradient(50% 50%, #000 calc(100% - var(--offset)),#0000 calc(100% - var(--border)));
  -webkit-mask: var(--_m);
          mask: var(--_m);
  border-radius: 50%;
  cursor: pointer;
  }

  .button-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  h2 {
    text-align: center;
    padding: 1.3rem;
  }
`;

export {
  GlobalStyle,
  Main,
};
