import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';

const CardPromptStyle = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-transform: uppercase;
    text-align: center;
    font-size: 22px;
    padding: 10px;
    color: #2c2b2b;
  }
  button {
    ${ButtonStyle}
    align-self: center;
    padding: 8px;
    background-color: gray;
    color: #fff;
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    margin-bottom: 10px;
    &:hover {
      background-color: ${(props) => props.theme.buttonColor};
      color: ${(props) => props.theme.fontColor};
    }
  }
`;

const PromptWindow = (props) => {
  const navig = useNavigate();
  const buttonNavigateTo = () => {
    navig(`/home/${props.link}`);
    props.setModal(false);
  };
  return (
    <CardPromptStyle>
      <div>
        <p>To contine use this app you should fill your {props.link}.</p>
      </div>
      <button className={'button_navigate'} onClick={buttonNavigateTo}>
        Clik
      </button>
    </CardPromptStyle>
  );
};

export default PromptWindow;
