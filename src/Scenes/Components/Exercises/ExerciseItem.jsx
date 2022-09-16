import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkItem = styled.li`
  margin: 15px;
  text-align: center;
  padding: 12px 0;
  font-size: 22px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0px 0px 6px gray;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    border-radius: 8px;
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.headerBackGroundColor};
    a {
      color: ${(props) => props.theme.headerBackGroundColor};
    }
  }
  .exerciseLink {
    color: ${(props) => props.theme.fontColor};
    text-transform: capitalize;
  }
`;

const ExerciseItem = (props) => {
  return (
    <StyledLinkItem>
      <Link className={'exerciseLink'} to={`${props.exercise}`}>
        {props.exercise}
      </Link>
    </StyledLinkItem>
  );
};

export default ExerciseItem;
