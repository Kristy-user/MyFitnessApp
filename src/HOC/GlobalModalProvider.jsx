import React, { useState } from 'react';
import styled from 'styled-components';
export const ModalContext = React.createContext(() => {});

const StyledModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 1000;

  .modalWindow {
    padding: 10px 20px;
    width: 300px;
    height: 300px;
    background-color: ${(props) => props.theme.appBackGround};
  }
`;

const GlobalModalProvider = (props) => {
  const [modalContent, setModalContent] = useState();

  return (
    <React.Fragment>
      {!!modalContent && (
        <StyledModalWrapper>
          <div className={'modalWindow'}>{modalContent}</div>
        </StyledModalWrapper>
      )}
      <ModalContext.Provider value={setModalContent}>
        {props.children}
      </ModalContext.Provider>
    </React.Fragment>
  );
};

export default GlobalModalProvider;
