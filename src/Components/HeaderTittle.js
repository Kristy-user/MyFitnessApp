import { css } from 'styled-components';

export const HeaderTittle = css`
  font-size: 30px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 700;
  margin-bottom: 30px;
  padding: 10px;
  text-shadow: 0px 0px 5px ${(props) => props.theme.buttonColor};
`;
