import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { currentGoalsSelector } from '../../../store/selectors/goals';
import { allActivitiesDoneSelector } from '../../../store/selectors/analytics';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressbarStyle = styled.div`
  margin: 30px auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 20px;
    color: #5a5a5aca;
    font-weight: bold;
    margin: 20px;
  }
  .circularBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .power,
  .cardio {
    margin: 10px;
  }
`;

export function TrainingAnalytics(props) {
  const allGoals = useSelector(currentGoalsSelector);
  const currentGoals = allGoals.find((goal) => goal.date == props.date);

  const numberPowerTrainingForGoal = currentGoals
    ? currentGoals.powerTraining
    : 0;
  const numberCardioTrainingForGoal = currentGoals
    ? currentGoals.cardioTraining
    : 0;

  const trainingsFullfilled = useSelector(allActivitiesDoneSelector);

  let thisMounthData = {};

  trainingsFullfilled.filter((item) =>
    item.date.slice(-7) == props.date ? (thisMounthData = item) : thisMounthData
  );

  const numberPowerTrainingDone = thisMounthData.numberPowerTraining;
  const numberCardioTrainingDone = thisMounthData.numberCardioTraining;

  return (
    <ProgressbarStyle>
      <p>Analytics of your training for {props.date} </p>
      <div className={'circularBar'}>
        <div className={'cardio'}>
          <p>Cardio training, (number)</p>
          <CircularProgressbar
            value={
              (numberCardioTrainingDone / numberCardioTrainingForGoal) * 100 ||
              0
            }
            text={
              `${
                numberCardioTrainingDone || '0'
              } / ${numberCardioTrainingForGoal}
        ` || 0
            }
            styles={buildStyles({
              textColor: 'gray',
              pathColor: '#3eb6b0',
              trailColor: '#857a7a',
            })}
          />
        </div>
        <div className={'power'}>
          <p>Power training, (number)</p>
          <CircularProgressbar
            value={
              (numberPowerTrainingDone / numberPowerTrainingForGoal) * 100 || 0
            }
            text={`${
              numberPowerTrainingDone || '0'
            } / ${numberPowerTrainingForGoal}
        `}
            styles={buildStyles({
              textColor: 'gray',
              pathColor: '#d697d8',
              trailColor: '#857a7a',
            })}
          />
        </div>
      </div>
    </ProgressbarStyle>
  );
}
