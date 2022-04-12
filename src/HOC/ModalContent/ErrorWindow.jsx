import React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import { CardStyle } from '../../Components/CardTemplate';

const SubmitErrorStyle = styled.div`
  ${CardStyle}
  background-color: ${(props) => props.theme.appBackGroundColor};
  color: ${(props) => props.theme.headerBackGroundColor};
  font-size: 18px;

  button {
    ${ButtonStyle}
    margin: 10px auto;
    padding: 3px;
    background-color: ${(props) => props.theme.cardBackGroundColor};
  }
`;

const ErrorWindow = (props) => {
  return (
    <SubmitErrorStyle>
      {props.error}
      <button onClick={() => props.setModal(false)}>Close</button>
    </SubmitErrorStyle>
  );
};

export default ErrorWindow;
