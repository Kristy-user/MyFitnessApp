import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import fakeServerAPI from '../../../api/fakeServerAPI';
import { ButtonStyle } from '../../../Components/Button';

import { editGoal, loadingUserGoals } from '../../../store/actions/goals';

import { goalsSelector } from '../../../store/selectors/goals';
import { userIdSelector } from '../../../store/selectors/user';

const GoalsFormStyle = styled.div`
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
  padding: 30px;
  h3 {
    font-size: 28px;
    color: ${(props) => props.theme.fontColor};
    font-weight: 900;
    margin: 30px auto;
  }
  span {
    margin-left: 10px;
    color: ${(props) => props.theme.appBackGroundColor};
    border-radius: 4px;
    padding: 5px;
    background-color: ${(props) => props.theme.fontColor};
  }
  li {
    text-shadow: 0px 0px 1px #030303;
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
  const userId = useSelector(userIdSelector);
  useEffect(() => {
    fakeServerAPI.get('/dataGoals').then((response) => {
      if (response.data[userId]) {
        dispatch(loadingUserGoals(response.data[userId]));
      }
    });
  }, []);
  const handleEditGoal = () => {
    dispatch(editGoal(false));
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
          <li>
            The weight you want to reach:
            <span>{goals.weight}</span>
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
