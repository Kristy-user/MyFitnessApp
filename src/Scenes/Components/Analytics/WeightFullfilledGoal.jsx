import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import weight from '../../../assets/icons/weight.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressbarStyle = styled.div`
  margin: 20px;
  .water {
    & p {
      padding: 20px;
      color: #5a5a5aca;
      font-weight: bold;
    }
  }
  width: 240px;
  .image_icon {
    width: 40px;
    margin: 10px;
  }
  .progress_text {
    font-size: 16px;
  }
`;

const WeightFullfilledGoal = ({ date, currentGoals, sortAnalyticsForDays }) => {
  const weightGoal = currentGoals.weight;
  const weightThisMonth = sortAnalyticsForDays.map((item) => item.weight);
  const persentFullfiledWeight =
    weightGoal && weightThisMonth.length > 0
      ? (
          (weightThisMonth.reduce(
            (prev, current) => prev + weightGoal / current,
            0
          ) /
            weightThisMonth.length) *
          100
        ).toFixed(2)
      : 0;

  return (
    <ProgressbarStyle>
      <div className={'water'}>
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: '#18586093',
            trailColor: '#857a7a',
          })}
          value={persentFullfiledWeight}
        >
          <img className={'image_icon'} src={weight} alt="water_glass" />
          <div className={'progress_text'}>
            <strong>{`${persentFullfiledWeight} %`}</strong>
          </div>
        </CircularProgressbarWithChildren>{' '}
        <p>Weight</p>
      </div>
    </ProgressbarStyle>
  );
};

export default WeightFullfilledGoal;
