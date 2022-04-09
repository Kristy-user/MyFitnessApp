import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import { HeaderTittle } from '../../Components/HeaderTittle';
import { showEditGoalsCard } from '../../store/actions/goals';
import { currentGoalsSelector } from '../../store/selectors/goals';

const GoalsFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    ${HeaderTittle}
  }
  span {
    margin: 0 10px;
    color: ${(props) => props.theme.appBackGroundColor};
    border-radius: 4px;
    padding: 5px;
    background-color: ${(props) => props.theme.unmarckColor};
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
  const currentGoals = useSelector(currentGoalsSelector);
  const dispatch = useDispatch();

  const handleEditGoal = () => {
    dispatch(showEditGoalsCard(true));
  };

  return (
    <GoalsFormStyle>
      <div>
        <h3>My Goals:</h3>
        <ul>
          <li>
            The amount of water per day:
            <span>{currentGoals.water} </span>ml.
          </li>
          <li>
            The number of steps per day:
            <span>
              {currentGoals.steps
                ? currentGoals.steps.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                : ''}
            </span>
            steps.
          </li>
          <li>
            The required number of power training per month:
            <span>{currentGoals.powerTraining}</span> pcs.
          </li>
          <li>
            The required number of cardio training you need per month:
            <span>{currentGoals.cardioTraining}</span>pcs.
          </li>
          <li>
            The weight you want to reach:
            <span>{currentGoals.weight}</span>kg.
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
