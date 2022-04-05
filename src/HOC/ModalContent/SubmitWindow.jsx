import React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import { CardStyle } from '../../Components/CardTemplate';

const SubmitWindowStyle = styled.div`
  ${CardStyle}
  background-color: ${(props) => props.theme.headerBackGroundColor};
  color: ${(props) => props.theme.appBackGroundColor};
  font-size: 18px;

  button {
    margin: 20px auto;
    padding: 5px;
    ${ButtonStyle}
  }
`;

const SubmitWindow = (props) => {
  if (props.type === 'refreshData') {
    return (
      <SubmitWindowStyle>
        <p>
          Your current data for {new Date().toLocaleDateString()} has been
          updated ✅
        </p>
        <button onClick={() => props.setModal(false)}>Ok</button>
      </SubmitWindowStyle>
    );
  }
  if (props.type === 'setNewData') {
    return (
      <SubmitWindowStyle>
        <p>
          Your current data for {new Date().toLocaleDateString()} has been set
          ✅
        </p>
        <button onClick={() => props.setModal(false)}>Ok</button>
      </SubmitWindowStyle>
    );
  }
};

export default SubmitWindow;
