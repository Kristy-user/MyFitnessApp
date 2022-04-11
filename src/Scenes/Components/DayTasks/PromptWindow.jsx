import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonStyle } from '../../../Components/Button';
import { showEditGoalsCard } from '../../../store/actions/goals';

const CardPromptStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 20%;
  border: 1px solid ${(props) => props.theme.buttonColor};
  background-color: ${(props) => props.theme.headerBackGroundColor};
  border-radius: 6px;
  p {
    text-transform: uppercase;
    text-align: center;
    font-size: 22px;
    padding: 10px;
    color: ${(props) => props.theme.appBackGroundColor};
  }
  button {
    ${ButtonStyle}
    align-self: center;
    padding: 10px 15px;
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    margin-bottom: 10px;
  }
`;

const PromptWindow = (props) => {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const buttonNavigateTo = () => {
    navig(`/home/${props.link}`);
    dispatch(showEditGoalsCard(true));
  };
  return (
    <CardPromptStyle>
      <div>
        <p>To contine use this app you should fill your {props.link}.</p>
      </div>
      <button className={'button_navigate'} onClick={buttonNavigateTo}>
        Fill
      </button>
    </CardPromptStyle>
  );
};

export default PromptWindow;
