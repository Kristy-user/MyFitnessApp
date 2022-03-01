import { css } from 'styled-components';

export const CardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  /* border: 0.5px solid ${(props) => props.theme.gradientColor_2}; */
  background-color: ${(props) => props.theme.headerBackGroundColor};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
