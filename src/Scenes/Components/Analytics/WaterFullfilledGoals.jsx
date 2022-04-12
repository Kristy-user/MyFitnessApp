import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import glassOfWater from '../../../assets/icons/glass_of_water.png';
import { useSelector } from 'react-redux';
import { waterDoneSelector } from '../../../store/selectors/analytics';
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

export function WaterFullfilledGoals({ date, currentGoals }) {
  const waterFullfiled = useSelector(waterDoneSelector);
  const thisMonthwaterFullfiled = waterFullfiled.filter(
    (item) => item.date.slice(-7) == date
  );
  const waterGoal = currentGoals.water / 300;

  const persentFullfiled =
    waterGoal && thisMonthwaterFullfiled.length > 0
      ? (
          (thisMonthwaterFullfiled.reduce(
            (prev, current) => prev + current.numberFullGlass / waterGoal,
            0
          ) /
            thisMonthwaterFullfiled.length) *
          100
        ).toFixed(2)
      : 0;

  return (
    <ProgressbarStyle>
      <div className={'water'}>
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: '#133d70ad',
            trailColor: '#857a7a',
          })}
          value={persentFullfiled}
        >
          <img className={'image_icon'} src={glassOfWater} alt="water_glass" />
          <div className={'progress_text'}>
            <strong>{`${persentFullfiled} %`}</strong>
          </div>
        </CircularProgressbarWithChildren>{' '}
        <p>Water </p>
      </div>
    </ProgressbarStyle>
  );
}
export default WaterFullfilledGoals;
