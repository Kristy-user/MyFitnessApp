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
  &::before, &::after {
    box-sizing: border-box;
  }
}
h3 {
  font-size:24px;
}
 body {
  /* overflow:hidden; */
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
  &:focus, &:hover &:active {
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
   }`;

export const globalDarkStyle = {
  cardBackGroundColor: '#bfbfbf',
  headerBackGroundColor: '#262626',
  appBackGroundColor: '#ededed',
  fontColor: '#1a0000',
  buttonColor: '#3eb6b0',
  toggleButtonColor: '#684f7087',
  shadowColor: '#e6e6e6',
  unmarckColor: '#808080',
};

export const globalLightStyle = {
  cardBackGroundColor: '#bfbfbf',
  headerBackGroundColor: '#ffffff',
  appBackGroundColor: '#262626',
  fontColor: '#0909099f',
  buttonColor: '#0b2926',
  toggleButtonColor: '#80ddd8eb',
  shadowColor: '#343333',
  unmarckColor: '#f9f9f9',
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
