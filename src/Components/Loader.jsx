import styled from 'styled-components';
import React from 'react';

const StyledLoader = styled.div`
  margin: 0;
  overflow: hidden;
  position: relative;
  .background {
    /* width: 20vh; */
    height: 20vh;

    --amount: 20;
  }

  .background span {
    width: 8vmin;
    height: 8vmin;
    border-radius: 4vmin;
    backface-visibility: hidden;
    position: absolute;
    animation-name: move;
    animation-timing-function: cubic-bezier(0.4, 0, 1, 0.8);
    animation-iteration-count: infinite;
    animation-duration: 3s;
    top: calc(50% - 4vmin);
    left: 55%;
    transform-origin: -4vmin center;
  }
  .background span:nth-child(1) {
    background: #c5f0a4;
    animation-delay: -0.5s;
    opacity: 0;
  }
  .background span:nth-child(2) {
    background: #226b80;
    animation-delay: -1s;
    opacity: 0;
  }
  .background span:nth-child(3) {
    background: #c5f0a4;
    animation-delay: -1.5s;
    opacity: 0;
  }
  .background span:nth-child(4) {
    background: #35b0ab;
    animation-delay: -2s;
    opacity: 0;
  }
  .background span:nth-child(5) {
    background: #c5f0a4;
    animation-delay: -2.5s;
    opacity: 0;
  }
  .background span:nth-child(6) {
    background: #226b80;
    animation-delay: -3s;
    opacity: 0;
  }

  @keyframes move {
    0% {
      transform: scale(1) rotate(0deg) translate3d(0, 0, 1px);
    }
    30% {
      opacity: 1;
    }
    100% {
      z-index: 10;
      transform: scale(0) rotate(360deg) translate3d(0, 0, 1px);
    }
  }
`;
const Loader = () => {
  return (
    <StyledLoader>
      <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </StyledLoader>
  );
};
export default Loader;
