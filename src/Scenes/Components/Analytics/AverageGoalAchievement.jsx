import React from 'react';
import styled from 'styled-components';
import StepsFullfiledGoal from './StepsFullfiledGoal';
import WaterFullfilledGoals from './WaterFullfilledGoals';
import WeightFullfilledGoal from './WeightFullfilledGoal';

const AverageGoalAchievementStyle = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
    color: #5a5a5aca;
    font-weight: bold;
    margin: 20px;
  }
  .progress_circles {
    display: flex;
    flex-direction: row;
  }
`;

const AverageGoalAchievement = (props) => {
  return (
    <AverageGoalAchievementStyle>
      <div className={'title'}>
        {' '}
        Average goal achievement for month {props.date}
      </div>
      <div className={'progress_circles'}>
        <StepsFullfiledGoal
          date={props.date}
          currentGoals={props.currentGoals}
          sortAnalyticsForDays={props.sortAnalyticsForDays}
        />
        <WaterFullfilledGoals
          date={props.date}
          currentGoals={props.currentGoals}
        />
        <WeightFullfilledGoal
          date={props.date}
          currentGoals={props.currentGoals}
          sortAnalyticsForDays={props.sortAnalyticsForDays}
        />
      </div>
    </AverageGoalAchievementStyle>
  );
};

export default AverageGoalAchievement;
