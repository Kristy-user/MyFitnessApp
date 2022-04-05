import React from 'react';
import styled from 'styled-components';

const LiStyle = styled.li`
  .icon:before {
    margin: 10px;
    text-shadow: 0px 0px 6px #e6e6e6;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 50px;
    cursor: pointer;
    color: gray;
  }
  .cardio:before,
  .completedCardio:before {
    content: '\f70c';
  }

  .completedCardio:before {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const CardioTrainingIcon = (props) => {
  return (
    <LiStyle key={props.index}>
      <div
        className={props.name ? 'icon completedCardio' : 'icon cardio'}
        onClick={props.handleCompletedGoal}
      ></div>
    </LiStyle>
  );
};

export default CardioTrainingIcon;
