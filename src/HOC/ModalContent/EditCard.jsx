import React, { useState, useContext } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  align-self: center;
  text-align: center;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  margin: 20px;

  .cardButton {
    margin: 20px auto;
  }
  .cardHeader {
    height: 20%;
    /* width: ${(props) => props.percentDone}%; */
    background-color: ${(props) => props.theme.headerBackGroundColor};

    /* &:hover {
      background-color: aquamarine;
    } */
  }
`;

const EditCard = (props) => {
  return (
    <StyledCard percentDone={Math.floor(Math.random() * 100)}>
      <div className={'cardHeader'}>{props.cardName}</div>
      <div className={'cardBody'}>Are you sure?</div>
      <div className={'cardFooter'}>
        <button
          className="cardButton"
          onClick={() => {
            props.deleteCard();
          }}
        >
          Submit
        </button>
        <button
          className="cardButton"
          onClick={() => {
            props.setModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </StyledCard>
  );
};

export default EditCard;

/* <input onChange={handleNewCardNameInput} value={newCardName} /> */
