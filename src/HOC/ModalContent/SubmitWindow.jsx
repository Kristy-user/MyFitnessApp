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
  if (!props.isTodayAnalyticsSet) {
    return (
      <SubmitWindowStyle>
        <p>Sorry, server is currently unavailable.</p>
        <button onClick={() => props.setModal(false)}>Ok</button>
      </SubmitWindowStyle>
    );
  } else if (props.type === 'refreshData') {
    return (
      <SubmitWindowStyle>
        <p>Your current data for {props.date} has been updated ✅</p>
        <button onClick={() => props.setModal(false)}>Ok</button>
      </SubmitWindowStyle>
    );
  } else if (props.type === 'setNewData') {
    return (
      <SubmitWindowStyle>
        <p>Your current data for {props.date} has been set ✅</p>
        <button onClick={() => props.setModal(false)}>Ok</button>
      </SubmitWindowStyle>
    );
  }
};

export default SubmitWindow;
