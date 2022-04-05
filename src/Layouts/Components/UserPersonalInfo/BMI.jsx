import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardStyle } from '../../../Components/CardTemplate';
import { useSelector } from 'react-redux';
import { currentUserPersonalData } from 'store/selectors/userPersonalData';
import Loader from '../../../Components/Loader';

const TYPE_BMI = [`Underweight`, `Normal weight`, `Overweight `, `Obesity`];
const DESCRIPTION = [
  `This result means that you may be underweight. Being underweight can be associated with a range of health issues. If you're concerned about your weight, we recommend discussing your result with your GP, practice nurse or dietitian.`,
  `This result means that you are a healthy body weight which is generally good for your health. Keep up the great work!`,
  `This result means that you may be overweight. Carrying extra weight is associated with a range of health concerns, including being at an increased risk of heart disease. If you're concerned about your weight, we recommend discussing your result with your GP, practice nurse or dietitian.`,
  `This result means that you may be obese. Obesity is associated with a range of health concerns, including being at an increased risk of heart disease. If you're concerned about your weight, we recommend discussing your result with your GP, practice nurse or dietitian.`,
];

const StyledIMT = styled.div`
  margin-top: 40px;
  ${CardStyle}
  background-color: ${(props) => props.theme.cardBackGroundColor};
  justify-content: center;

  .bold {
    font-weight: bold;
  }
  .cursive {
    font-style: italic;
    padding-left: 15px;
  }
  .result {
    display: flex;
    margin: 10px auto;
    align-items: center;
  }
  .title {
    /* margin: 0 auto; */
  }
  .icon:before {
    display: block;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 36px;
  }

  .underweight:before {
    content: '\f11a';
    color: orange;
  }

  .normal:before {
    content: '\f580';
    color: green;
  }
  .overweight:before {
    content: '\f119';
    color: yellow;
  }
  .obesity:before {
    content: '\f5c2';
    color: red;
  }
`;

const BMI = () => {
  const userPersoonalData = useSelector(currentUserPersonalData);
  if (userPersoonalData) {
    const weight = userPersoonalData.weight;
    const height = userPersoonalData.height / 100;
    let BMI = weight / (height ^ 2);

    let classNameIcon = '';
    function calculateBMIType(value) {
      if (value <= 18.5) {
        classNameIcon = 'underweight';
        return 0;
      } else if (value > 18.5 && value <= 24.9) {
        classNameIcon = 'normal';
        return 1;
      } else if (value > 24.9 && value <= 29.9) {
        classNameIcon = 'overweight';
        return 2;
      } else if (value > 29.9) {
        classNameIcon = 'obesity';
        return 3;
      }
    }
    let index = calculateBMIType(BMI);
    let currentDescription = DESCRIPTION[index];
    let currentTitle = TYPE_BMI[index];

    return (
      <StyledIMT>
        <p className={'title'}>
          Your <span className={'bold'}>BMI = {BMI.toFixed(2)}. </span>{' '}
        </p>
        <p>
          It's mean <span className={'bold'}>{currentTitle}.</span>
        </p>
        <div className={'result'}>
          <div className={`icon ${classNameIcon}`}></div>{' '}
          <div>
            <p className={'cursive'}>{currentDescription}</p>
          </div>
        </div>
      </StyledIMT>
    );
  } else
    return (
      <StyledIMT>
        <Loader />
      </StyledIMT>
    );
};

export default BMI;
