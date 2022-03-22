import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkItem = styled.li`
  margin: 15px 5px;
  text-align: center;
  padding: 12px 0;
  font-size: 22px;
  font-weight: 600;
  border-radius: 8px;
  text-shadow: 0px 0px 6px #fff;
  box-shadow: 0px 0px 6px gray;
  color: ${(props) => props.theme.fontColor};

  &:hover {
    border-radius: 8px;
    background-color: ${(props) => props.theme.buttonColor};
    text-shadow: 0px 0px 6px #fff;
  }
  .exerciseLink {
    text-transform: capitalize;
  }
`;

const ExerciseItem = (props) => {
  return (
    <StyledLinkItem key={props.exercise.id}>
      <Link className={'exerciseLink'} to={`${props.exercise}`}>
        {props.exercise}
      </Link>
    </StyledLinkItem>
  );
};

export default ExerciseItem;
