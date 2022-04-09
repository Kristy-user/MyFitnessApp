import { css } from 'styled-components';

export const ButtonStyle = css`
  appearance: none;
  border: none;
  border-radius: 6px;
  padding: 10px;
  width: max-content;
  font-size: 26px;
  box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};

  color: ${(props) => props.theme.headerBackGroundColor};
  background-color: ${(props) => props.theme.buttonColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.buttonColor};
    background-color: ${(props) => props.theme.headerBackGroundColor};
  }
`;
