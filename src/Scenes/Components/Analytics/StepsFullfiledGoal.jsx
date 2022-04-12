import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import steps from '../../../assets/icons/steps.png';

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

const StepsFullfiledGoal = ({ date, currentGoals, sortAnalyticsForDays }) => {
  const stepsGoal = currentGoals.steps;
  const numberOfSteps = sortAnalyticsForDays.map((item) => item.numberSteps);
  const persentFullfiledSteps =
    stepsGoal && numberOfSteps.length > 0
      ? (
          (numberOfSteps.reduce(
            (prev, current) => prev + current / stepsGoal,
            0
          ) /
            numberOfSteps.length) *
          100
        ).toFixed(2)
      : 0;

  return (
    <ProgressbarStyle>
      <div className={'water'}>
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: '#410d3b8d',
            trailColor: '#857a7a',
          })}
          value={persentFullfiledSteps}
        >
          <img className={'image_icon'} src={steps} alt="water_glass" />
          <div className={'progress_text'}>
            <strong>{`${persentFullfiledSteps} %`}</strong>
          </div>
        </CircularProgressbarWithChildren>{' '}
        <p>Steps </p>
      </div>
    </ProgressbarStyle>
  );
};

export default StepsFullfiledGoal;
