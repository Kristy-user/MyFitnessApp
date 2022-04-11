import React from 'react';
import styled from 'styled-components';

const StyleErrorWrapper = styled.div`
  padding: 0;
  margin: 0;
  /* background-color: #000; */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vh;

  h4 {
    position: relative;
    color: hsl(0, 0%, 68%);
    font-weight: bold;
    font-family: 'Anonymous Pro', monospace;
    letter-spacing: 7px;
    overflow: hidden;
    border-right: 2px solid hsl(0, 0%, 80%);
    /* white-space: nowrap; */
    animation: typewriter 4s steps(44) 1s 1 normal both,
      blinkTextCursor 500ms infinite;
  }

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 710px;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: hsl(0, 0%, 80%);
    }
    to {
      border-right-color: transparent;
    }
  }
`;

const ServerUnavailable = (props) => {
  return (
    <StyleErrorWrapper>
      <h4>{props.error}</h4>
    </StyleErrorWrapper>
  );
};

export default ServerUnavailable;
