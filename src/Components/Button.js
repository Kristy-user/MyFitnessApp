import { css } from 'styled-components';

export const ButtonStyle = css`
  color: ${(props) => props.theme.fontColor};
  appearance: none;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 20px;
  width: fit-content;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.headerBackGroundColor},
    ${(props) => props.theme.appBackGroundColor}
  );
`;
