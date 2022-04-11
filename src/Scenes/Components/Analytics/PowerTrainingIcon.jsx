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
  .power:hover:before {
    color: ${(props) => props.theme.fontColor};
  }
  .power:before,
  .completedPower:before {
    content: '\f44b';
  }

  .completedPower:before {
    color: ${(props) => props.theme.fontColor};
  }
`;

const PowerTrainingIcon = (props) => {
  return (
    <LiStyle key={props.index}>
      <div
        onClick={props.setNewValue}
        className={props.name ? 'icon completedPower' : 'icon power'}
      ></div>
    </LiStyle>
  );
};

export default PowerTrainingIcon;
