import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkItem = styled.li`
  display: inline-block;
  margin: 5px;
  padding: 10px;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  border-radius: 8px;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    border-radius: 8px;
    background-color: ${(props) => props.theme.fontColor};
  }

  p {
    display: inline;
  }
  a {
    text-transform: capitalize;
    border-radius: 8px;
    width: 100%;
    padding: 10px;
    &:hover {
      color: ${(props) => props.theme.gradientColor_1};
    }
  }
`;

const ExerciseItem = (props) => {
  return (
    <StyledLinkItem key={props.exercise.id}>
      <strong> {props.index + 1}. </strong>
      &nbsp;
      <Link to={`${props.exercise}`}>
        <p className={'home'}>{props.exercise}</p>
      </Link>
    </StyledLinkItem>
  );
};

export default ExerciseItem;
