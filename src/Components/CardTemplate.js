import { css } from 'styled-components';

export const CardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.buttonColor} 0px 5px 15px -10px inset,
    ${(props) => props.theme.buttonColor} 0px -5px 15px -10px inset;
`;
