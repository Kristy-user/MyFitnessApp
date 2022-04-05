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
  .glass:before {
    content: '\f7a0';
  }
  .fullglass:before {
    content: '\f7a0';
  }
  .fullglass:before {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const WaterIcon = (props) => {
  return (
    <LiStyle key={props.index}>
      <div
        className={props.name ? 'icon fullglass' : 'icon glass'}
        onClick={props.handleCompletedGoal}
      >
        <p>300ml</p>
      </div>
    </LiStyle>
  );
};

export default WaterIcon;
