import React from 'react';
import styled from 'styled-components';
import lendingImg from '../../assets/images/login.jpg';
import { LogoStyle } from '../../Components/Logo';
import ImageCarusel from './ImageCarusel';
import Login from './Login';

const StyledEntry = styled.div`
  display: flex;
  background-color: inherit;
  background-image: url(${lendingImg});
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  flex-direction: column;
  justify-content: center;

  .logo {
    ${LogoStyle}
  }
  .container {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;

    box-shadow: rgba(250, 249, 249, 0.25) 0px 54px 55px,
      rgb(250, 249, 249, 0.25) 0px -12px 30px,
      rgba(250, 249, 249, 0.25) 0px 4px 6px,
      rgba(250, 249, 249, 0.25) 0px 12px 13px,
      rgba(250, 249, 249, 0.25) 0px -3px 55px;
  }
`;

const Autorization = () => {
  return (
    <StyledEntry>
      <div className="logo">
        <p>TimeToSport</p>
      </div>
      <div className={'container'}>
        <ImageCarusel />
        <Login />
      </div>
    </StyledEntry>
  );
};

export default Autorization;
