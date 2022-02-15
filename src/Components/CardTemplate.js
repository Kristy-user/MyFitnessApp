import { css } from 'styled-components';

export const CardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  border: 0.5px solid ${(props) => props.theme.gradientColor_2};
  background-color: ${(props) => props.theme.headerBackGroundColor};
`;
