import { css } from 'styled-components';

export const CardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
`;
