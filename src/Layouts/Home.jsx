import React, { useContext, useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { ThemeContext } from 'HOC/GlobalThemeProvider';
import RootRouter from '../Route/ReactRouter';
import NavigateBlock from './MainLayout/NavigateBlock';
import UserCard from './MainLayout/UserCard';
import SportNews from './MainLayout/SportNews';

const StyledLayout = styled.div`
  margin: auto;
  text-align: center;

  .logo-1 {
    background-image: linear-gradient(
      43deg,
      #051937 0%,
      #008793 46%,
      #12eb7f 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .logo-2 {
    display: inline;
  }
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.fontColor};
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.appBackGroundColor};
    font-size: 30px;
  }

  .content {
    background-color: '#dde0e0';
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .leftLayout,
  .mainLayout,
  .rightLayout {
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
  }
  .mainLayout {
    width: 100%;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 74px;
    height: 34px;
    right: 30px;
    & input {
      display: none;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.headerBackGroundColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: ${(props) => props.theme.toggleButtonColor};
      -webkit-transition: 0.6s;
      transition: 0.6s;
    }
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.headerBackGroundColor};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.headerBackGroundColor};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border: 0.5px outset ${(props) => props.theme.gradientColor_2};
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }
`;

const Home = () => {
  const changeTheme = useContext(ThemeContext);
  return (
    <StyledLayout>
      <div className={'header'}>
        <div classname={'logo'}>
          <span className="logo-1">TimeTo</span>
          <span className="logo-2">Sport</span>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            onChange={() => changeTheme((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className={'content'}>
        <div className="leftLayout">
          <NavigateBlock />
          <SportNews />
        </div>
        <div className="mainLayout">
          <RootRouter />
        </div>
        <div className="rightLayout">
          <UserCard />
          {/* <Calendar /> */}
        </div>
      </div>
    </StyledLayout>
  );
};
export default Home;
