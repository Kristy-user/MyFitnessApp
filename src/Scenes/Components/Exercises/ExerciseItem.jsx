import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkItem = styled.li`
  display: inline-block;
  margin: 10px;
  padding: 10px;
  text-align: left;
  font-size: 20px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 8px;

  &:hover {
    border-radius: 8px;
    background-color: ${(props) => props.theme.fontColor};
  }

  p {
    display: inline;
  }
  a {
    color: ${(props) => props.theme.fontColor};
    text-transform: capitalize;
    border-radius: 8px;
    width: 100%;
    padding: 10px;
    &:hover {
      color: ${(props) => props.theme.headerBackGroundColor};
    }
  }
`;

const ExerciseItem = (props) => {
  return (
    <StyledLinkItem key={props.exercise.id}>
      <strong>{props.index + 1}.</strong>
      &nbsp;
      <Link to={`/exercises/${props.exercise}`}>
        <p className={'home'}>{props.exercise}</p>
      </Link>
    </StyledLinkItem>
  );
};

export default ExerciseItem;
