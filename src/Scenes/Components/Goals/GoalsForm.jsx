import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from 'Components/Button';
import { HeaderTittle } from 'Components/HeaderTittle';
import Loader from 'Components/Loader';
import { showEditGoalsCard } from 'store/actions/goals';
import { isGoalsSetSelector } from 'store/selectors/goals';

const GoalsFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    ${HeaderTittle}
  }
  .date {
    font-size: 24px;
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

const GoalsForm = ({ goals, date }) => {
  const dispatch = useDispatch();
  const isSetDataGoals = useSelector(isGoalsSetSelector);
  const [isLoadedGoals, setIsLoadedGoals] = useState(isSetDataGoals);

  useEffect(() => {
    setIsLoadedGoals(isSetDataGoals);
  }, [isSetDataGoals]);

  const handleEditGoal = () => {
    dispatch(showEditGoalsCard(true));
  };

  if (!isLoadedGoals || !goals) {
    return <Loader />;
  } else {
    return (
      <GoalsFormStyle>
        <div>
          <h3>
            My goals on <span className={'date'}>{date}</span>
          </h3>
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
  }
};

export default GoalsForm;
