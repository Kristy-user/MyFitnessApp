import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CardStyle } from '../../Components/CardTemplate';

const StyledNav = styled.div`
  ${CardStyle}
  background-color: ${(props) => props.theme.headerBackGroundColor};
  justify-content: center;
  min-height: calc(100vh - 120px);

  li {
    &:hover {
      color: ${(props) => props.theme.headerBackGroundColor};
      border-radius: 8px;
      background-color: ${(props) => props.theme.buttonColor};
      box-shadow: 0px 0px 6px #e6e6e6;
      a {
        color: ${(props) => props.theme.headerBackGroundColor};
      }
    }
  }

  h2 {
    padding: 5px 40px;
    font-size: 28px;

    &:before {
      font-family: 'Font Awesome 5 Free';
      padding-right: 10px;
    }
  }
  .home:before {
    content: '\f015';
  }
  .goals:before {
    content: '\f140';
  }
  .activities:before {
    content: '\f70c';
  }
  .shedule:before {
    content: '\f073';
  }
  .analytics:before {
    content: '\f201';
  }

  a {
    text-align: left;
    border-radius: 8px;
    width: 100%;
    padding: 10px;
    color: ${(props) => props.theme.buttonColor};
  }
`;

const NavigateBlock = () => {
  return (
    <StyledNav>
      <nav>
        <ul>
          <li>
            <Link to={'/home'}>
              <h2 className={'home'}>Home</h2>
            </Link>
          </li>
          <li>
            <Link to={'/home/goals'}>
              <h2 className={'goals'}>My goals</h2>
            </Link>
          </li>
          <li>
            <Link to={'/home/exercises'}>
              <h2 className={'activities'}>Exercises</h2>
            </Link>
          </li>
          <li>
            <Link to={'/home/shedule'}>
              <h2 className={'shedule'}>Shedule</h2>
            </Link>
          </li>
          <li>
            <Link to={'/home/analytics'}>
              <h2 className={'analytics'}>Analytics</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </StyledNav>
  );
};

export default NavigateBlock;
