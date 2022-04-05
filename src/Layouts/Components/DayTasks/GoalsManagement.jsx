import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  addNewMonthAnalytics,
  refreshAnalytics,
} from '../../../store/actions/analytics';
import Loader from '../../../Components/Loader';
import { useDispatch } from 'react-redux';
import {
  allActivitiesDoneSelector,
  isLoadedDataSelector,
} from '../../../store/selectors/analytics';
import { userIdSelector } from '../../../store/selectors/user';
import { currentGoalsSelector } from '../../../store/selectors/goals';
import WaterIcon from '../Analytics/WaterIcon';
import PowerTrainingIcon from '../Analytics/PowerTrainingIcon';
import CardioTrainingIcon from '../Analytics/CardioTrainingIcon';

const ActivityStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .analytic_title {
    text-transform: uppercase;
    font-size: 18px;
    padding: 5px;
    margin: 15px 0 5px 0;
    text-shadow: 0px 0px 1px ${(props) => props.theme.fontColor};
    color: gray;
    width: fit-content;
    align-self: center;
  }
  & p {
    color: ${(props) => props.theme.fontColor};
  }
  .title {
    color: gray;
    font-size: 16px;
    span {
      color: ${(props) => props.theme.fontColor};
      font-weight: bold;
    }
  }
  .water_wrapper,
  .power_wrapper,
  .cardio_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px;
  }
  .water_part {
    border-bottom: 1px solid gray;
    padding-bottom: 15px;
  }
  .icon:before {
    margin: 10px;
    text-shadow: 0px 0px 6px #e6e6e6;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 50px;
    cursor: pointer;
    color: gray;
  }
  .glass:before {
    content: '\f7a0';
  }
  .fullglass:before {
    content: '\f7a0';
  }
  .power:before {
    content: '\f44b';
  }
  .completedPower:before {
    content: '\f44b';
  }
  .cardio:before {
    content: '\f70c';
  }
  .completedCardio:before {
    content: '\f70c';
  }
  .completedCardio:before,
  .completedPower:before,
  .fullglass:before {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const GoalsManagement = (props) => {
  const userId = useSelector(userIdSelector);
  const currentGoals = useSelector(currentGoalsSelector);
  const dispatch = useDispatch();
  const userGoalsFullfilling = useSelector(allActivitiesDoneSelector);

  const getMonth = (date) =>
    date.toLocaleDateString().split('.').slice(-2).join('');

  const monthChecked = getMonth(props.date);

  const [thisMonthData, setThisMonthData] = useState(
    userGoalsFullfilling.find(
      (item) => item.date.split('.').slice(-2).join('') === monthChecked
    ) || {}
  );

  useEffect(() => {
    setThisMonthData(
      userGoalsFullfilling.find(
        (item) => item.date.split('.').slice(-2).join('') === monthChecked
      ) || {}
    );
  }, [props.date]);
  console.log(
    userGoalsFullfilling.find(
      (item) => item.date.split('.').slice(-2).join('') === monthChecked
    ),
    thisMonthData
  );
  const [numberFullGlass, setNumberFullGlass] = useState(
    thisMonthData.date == new Date().toLocaleDateString()
      ? thisMonthData.numberFullGlass
      : 0
  );
  const [numberPowerTraining, setNumberPowerTraining] = useState(
    thisMonthData.numberPowerTraining ? thisMonthData.numberPowerTraining : 0
  );
  const [numberCardioTraining, setNumberCardioTraining] = useState(
    thisMonthData.numberCardioTraining ? thisMonthData.numberCardioTraining : 0
  );
  const allWaterGlasses = currentGoals.water / 300;
  let glasses = new Array(allWaterGlasses - numberFullGlass).fill('');
  let fullGlasses = new Array(numberFullGlass).fill('');

  const allPowerTraining = currentGoals.powerTraining;
  let plainPowerTraining = new Array(
    allPowerTraining - numberPowerTraining
  ).fill('');
  let completedPowerTraining = new Array(numberPowerTraining).fill('');

  const allCardioTraining = currentGoals.cardioTraining;

  let plainCardioTraining = new Array(
    allCardioTraining - numberCardioTraining
  ).fill('');
  let completedCardioTraining = new Array(numberCardioTraining).fill('');

  function handleCompletedGoal(e) {
    const className = e.target.classList;
    switch (true) {
      case className.contains('glass'):
        setNumberFullGlass(numberFullGlass + 1);
        break;
      case className.contains('fullglass'):
        setNumberFullGlass(numberFullGlass - 1);
        break;
      case className.contains('power'):
        setNumberPowerTraining(numberPowerTraining + 1);
        break;
      case className.contains('completedPower'):
        setNumberPowerTraining(numberPowerTraining - 1);
        break;
      case className.contains('cardio'):
        setNumberCardioTraining(numberCardioTraining + 1);
        break;
      case className.contains('completedCardio'):
        setNumberCardioTraining(numberCardioTraining - 1);
        break;
    }
  }

  useEffect(() => {
    let analyticsData = {
      numberFullGlass,
      numberPowerTraining,
      numberCardioTraining,
      userId,
      date: props.date.toLocaleDateString(),
    };

    if (!thisMonthData.date) {
      console.log('new');
      dispatch(addNewMonthAnalytics(analyticsData));
    } else if (
      thisMonthData.date.split('.').slice(-2).join('') === monthChecked
    ) {
      console.log('refresh');
      dispatch(refreshAnalytics(analyticsData, thisMonthData.id));
    }
  }, [numberCardioTraining, numberPowerTraining, numberFullGlass]);

  return (
    <ActivityStyleWrapper>
      <div className={'water_part'}>
        <div className={'water_wrapper'}>
          {fullGlasses.map((item, index) => (
            <WaterIcon
              key={index}
              handleCompletedGoal={handleCompletedGoal}
              name={'full'}
            />
          ))}
          {glasses.map((item, index) => (
            <WaterIcon
              key={index}
              handleCompletedGoal={handleCompletedGoal}
              name={''}
            />
          ))}
        </div>
        <p className={'title'}>
          *click if you drank <span>water</span> today.
        </p>
      </div>
      <p className={'analytic_title'}>current data for Month</p>
      <div className={'power_part'}>
        <div className={'power_wrapper'}>
          {completedPowerTraining.map((item, index) => (
            <PowerTrainingIcon
              key={index}
              handleCompletedGoal={handleCompletedGoal}
              name={'completed'}
            />
          ))}
          {plainPowerTraining.map((item, index) => (
            <PowerTrainingIcon
              key={index}
              handleCompletedGoal={handleCompletedGoal}
              name={''}
            />
          ))}
        </div>
        <p className={'title'}>
          *click if you have done <span>power</span> training
        </p>
      </div>
      <div className={'cardio_part'}>
        <div className={'cardio_wrapper'}>
          {completedCardioTraining.map((item, index) => (
            <CardioTrainingIcon
              key={index}
              name={'cardio'}
              handleCompletedGoal={handleCompletedGoal}
            />
          ))}
          {plainCardioTraining.map((item, index) => (
            <CardioTrainingIcon
              key={index}
              className={''}
              handleCompletedGoal={handleCompletedGoal}
            />
          ))}
        </div>
        <p className={'title'}>
          *click if you have done <span>cardio</span> training
        </p>
      </div>
    </ActivityStyleWrapper>
  );
};

export default GoalsManagement;
