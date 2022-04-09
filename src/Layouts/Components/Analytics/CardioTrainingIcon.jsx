import React from 'react';
import styled from 'styled-components';

const LiStyle = styled.li`
  .icon:before {
    margin: 10px;
    text-shadow: #fff;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 50px;
    cursor: pointer;
    color: ${(props) => props.theme.unmarckColor};
  }
  .cardio:hover:before {
    color: ${(props) => props.theme.fontColor};
  }
  .cardio:before,
  .completedCardio:before {
    content: '\f70c';
  }

  .completedCardio:before {
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
