import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  color: #fff;
  height: 100vh;
  overflow: hidden;
  background: #333641;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background: 50% 100% / 50% 50% no-repeat
      radial-gradient(ellipse at bottom, #fff, transparent, transparent);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 10vw;
    font-family: 'Source Sans Pro', sans-serif;
    animation: reveal 3000ms ease-in-out forwards 200ms,
      glow 2500ms linear infinite 2000ms;

    @keyframes reveal {
      80% {
        letter-spacing: 8px;
      }
      100% {
        background-size: 300% 300%;
      }
    }
    @keyframes glow {
      40% {
        text-shadow: 0 0 8px #fff;
      }
    }
  }
`;

const Page404 = () => {
  let location = useLocation();
  return (
    <StyledWrapper>
      <div className={'title'}>
        404
        {/* No match for <span>{location.pathname}</span> */}
      </div>
    </StyledWrapper>
  );
};

export default Page404;
