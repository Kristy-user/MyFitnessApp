import React, { useState } from 'react';
import styled from 'styled-components';

const StyledModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  top: 0%;
  left: 0%;
  z-index: 1000;
  border-radius: 8px;
  .modalWindow {
    margin: 0 auto;
    min-width: fit-content;
    max-width: 60%;
    height: fit-content;
  }
`;

export const ModalContext = React.createContext(() => {});

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
