import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import fakeServerAPI from '../../api/fakeServerAPI';
import { ButtonStyle } from '../../Components/Button';
import { HeaderTittle } from '../../Components/HeaderTittle';
import { editGoal, loadingUserGoals } from '../../store/actions/goals';
import { goalsSelector } from '../../store/selectors/goals';
import { userIdSelector } from '../../store/selectors/user';

const GoalsFormStyle = styled.div`
  display: flex;

  flex-direction: column;
  h3 {
    ${HeaderTittle}
  }
  span {
    margin: 0 10px;
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
    border-radius: 4px;
    padding: 5px;
    background-color: gray;
  }
  li {
    color: ${(props) => props.theme.fontColor};
    line-height: 1.8;
    text-align: left;
    font-size: 24px;
    padding: 10px;
  }
  li::before {
    content: '	✎';
    padding-right: 10px;
    color: ${(props) => props.theme.fontColor};
  }
  .editButton {
    align-self: flex-end;
    ${ButtonStyle};
    margin-right: 30px;
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
            <span>{goals.water} </span>ml.
          </li>
          <li>
            The number of steps per day:
            <span>
              {goals.steps
                ? goals.steps.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                : ''}
            </span>
            steps.
          </li>
          <li>
            The required number of power training per month:
            <span>{goals.powerTraining}</span> pcs.
          </li>
          <li>
            The required number of cardio training you need per month:
            <span>{goals.cardioTraining}</span>pcs.
          </li>
          <li>
            The weight you want to reach:
            <span>{goals.weight}</span>kg.
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
