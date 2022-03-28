import React, { useState } from 'react';
import styled from 'styled-components';
import lendingImg from '../assets/images/login.jpg';
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

  .modalWindow {
    border-radius: 6px;
    margin: 0 auto;
    padding: 10px;
    min-width: 45%;
    max-width: 60%;
    height: fit-content;
    background-color: ${(props) => props.theme.modalWindow};
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
