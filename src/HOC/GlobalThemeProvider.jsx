import React, { memo, useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import latoFont from 'assets/fonts/Lato-Regular.ttf';
import latoFontBold from 'assets/fonts/Lato-Bold.ttf';

export const ThemeContext = React.createContext('');

export const GlobalStyles = createGlobalStyle`
 
* {
  color:'#333333';
  padding: 0;
  margin: 0;
  list-style-type: none;
  box-sizing: border-box;
  text-decoration: none;
}

h3 {
  font-size:24px;
}
 body {
  margin: 0;
   color:'#333333'; 
  font-family: 'Lato', sans-serif;
}
a {
  color: inherit;
}
input{
  border: none;
  outline: none;
  &:focus, &:hover &:active{
    border: none;
        outline: none;
}
}
@font-face {
     font-family: 'Lato', sans-serif;
     src: url(${latoFont});
     font-style: normal; 
    font-weight: normal;
   };
   
   @font-face {
     font-family: 'Lato', sans-serif;
     src: url(${latoFontBold});
     font-style: normal; 
    font-weight: bold;
   };
`;

export const globalDarkStyle = {
  cardBackgroundColor: '#7dacc250',
  headerBackGroundColor: '#25252550',
  appBackGroundColor: '#c6e2e2',
  fontColor: '#55817a',
  buttonColor: '#3eb6b0',
  toggleButtonColor: '#f1b7a6',
  gradientColor_1: '#363d44',
  gradientColor_2: '#bcc0c2',
};

export const globalLightStyle = {
  cardBackgroundColor: '#f8bcaa68',
  headerBackGroundColor: '#f8f5f876',
  appBackGroundColor: '#ede0b750',
  fontColor: '#86090fa9',
  buttonColor: '#f8f7f7',
  toggleButtonColor: '#0a747084',
  gradientColor_1: '#ff527a',
  gradientColor_2: '#ff9575',
};

const GlobalThemeProvider = (props) => {
  const [isThemeLight, setIsThemeLight] = useState(false);

  return (
    <ThemeProvider theme={isThemeLight ? globalLightStyle : globalDarkStyle}>
      <ThemeContext.Provider value={setIsThemeLight}>
        <GlobalStyles />
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default memo(GlobalThemeProvider);
