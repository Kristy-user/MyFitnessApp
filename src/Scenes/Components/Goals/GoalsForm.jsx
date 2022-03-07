import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../../Components/Button';

import { editGoal } from '../../../store/actions/goals';

import { goalsSelector } from '../../../store/selectors/goals';

const GoalsFormStyle = styled.div`
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
  padding: 30px;
  h3 {
    font-size: 26px;
    color: ${(props) => props.theme.gradientColor_1};
    text-shadow: ${(props) => props.theme.appBackGroundColor};
    margin: 30px auto;
  }
  span {
    margin-left: 10px;
    color: ${(props) => props.theme.appBackGroundColor};
    border-radius: 4px;
    padding: 5px;
    background-color: ${(props) => props.theme.gradientColor_1};
  }
  li {
    color: ${(props) => props.theme.fontColor};
    line-height: 1.8;
    text-align: left;
    font-size: 20px;
    padding: 10px;
  }
  li::before {
    content: '✒';
    padding-right: 10px;
    color: ${(props) => props.theme.fontColor};
  }
  .editButton {
    ${ButtonStyle};
    margin-top: 30px;
  }
`;

const GoalsForm = () => {
  const goals = useSelector(goalsSelector);
  const dispatch = useDispatch();
  const handleEditGoal = () => {
    dispatch(editGoal(false));
    console.log(goals);
  };
  return (
    <GoalsFormStyle>
      <div>
        <h3>My Goals:</h3>

        <ul>
          <li>
            The amount of water per day:
            <span>{goals.water} ml</span>
          </li>
          <li>
            The number of steps per day:
            <span>
              {goals.steps
                ? goals.steps.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                : ''}
            </span>
          </li>
          <li>
            The required number of power training per week:
            <span>{goals.powerTraining}</span>
          </li>
          <li>
            The required number of cardio training you need per week:
            <span>{goals.cardioTraining}</span>
          </li>
        </ul>
      </div>
      <button className="editButton" onClick={handleEditGoal}>
        Edit
      </button>
    </GoalsFormStyle>
  );
};

export default GoalsForm;
