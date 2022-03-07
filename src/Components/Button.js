import { css } from 'styled-components';

export const ButtonStyle = css`
  appearance: none;
  border: none;
  border-radius: 6px;
  padding: 10px;
  width: max-content;
  font-size: 26px;
  box-shadow: 0px 0px 6px #e6e6e6;
  text-shadow: 0px 0px 6px #e6e6e6;

  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.cardBackgroundColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.gradientColor_1};
    background-color: ${(props) => props.theme.buttonColor};
  }
`;
