import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { goalsSelector } from '../../store/selectors/goals';
import { userIdSelector } from '../../store/selectors/user';
import {
  loadingUserAnalytics,
  refreshAnalytics,
} from '../../store/actions/analytics';
import fakeServerAPI from '../../api/fakeServerAPI';
import { useDispatch } from 'react-redux';
import { allAnalyticsSelector } from '../../store/selectors/analytics';

const ActivityStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const GoalsManagement = () => {
  const userId = useSelector(userIdSelector);
  const goals = useSelector(goalsSelector);
  const dispatch = useDispatch();
  const allWaterGlasses = goals.water / 300;

  useEffect(() => {
    fakeServerAPI.get(`/dataAnalytics?userId=${userId}`).then((response) => {
      console.log(response.data);
      if (response.data) {
        console.log(response.data);
        dispatch(loadingUserAnalytics(response.data));
      }
    });
  }, []);

  const userGoalsFullfilling = useSelector(allAnalyticsSelector);

  const dateNow = new Date()
    .toLocaleDateString()
    .split('.')
    .reverse()
    .slice(0, 2)
    .join(',');

  let thisMounthData = {};

  userGoalsFullfilling.filter((item) => {
    item.date === dateNow;
    thisMounthData = item;
  });

  const [numberFullGlass, setNumberFullGlass] = useState(
    thisMounthData.numberFullGlass ? thisMounthData.numberFullGlass : 0
  );

  const glasses = [];
  const fullGlasses = [];
  glasses.length = allWaterGlasses - numberFullGlass;
  fullGlasses.length = numberFullGlass;

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

  const allPowerTraining = goals.powerTraining;

  const [numberPowerTraining, setNumberPowerTraining] = useState(
    thisMounthData.numberPowerTraining ? thisMounthData.numberPowerTraining : 0
  );

  let plainPowerTraining = [];
  let completedPowerTraining = [];
  completedPowerTraining.length = numberPowerTraining;
  plainPowerTraining.length = allPowerTraining - numberPowerTraining;

  const allCardioTraining = goals.cardioTraining;

  const [numberCardioTraining, setNumberCardioTraining] = useState(
    thisMounthData.numberCardioTraining
      ? thisMounthData.numberCardioTraining
      : 0
  );

  let plainCardioTraining = [];
  let completedCardioTraining = [];
  completedCardioTraining.length = numberCardioTraining;
  plainCardioTraining.length = allCardioTraining - numberCardioTraining;

  useEffect(() => {
    let analyticsData = {
      numberFullGlass,
      numberPowerTraining,
      numberCardioTraining,
      userId,
      date: dateNow,
    };
    console.log(analyticsData);
    dispatch(refreshAnalytics(analyticsData));
  }, [numberFullGlass, numberPowerTraining, numberCardioTraining]);

  if (goals.water) {
    return (
      <ActivityStyleWrapper>
        <div className={'water_part'}>
          <div className={'water_wrapper'}>
            {fullGlasses.fill(
              <div className={'icon fullglass'} onClick={handleCompletedGoal}>
                <p>300ml</p>
              </div>
            )}
            {glasses.fill(
              <div className={'icon glass'} onClick={handleCompletedGoal}>
                <p>300ml</p>
              </div>
            )}
          </div>
          <p className={'title'}>
            *click if you drank <span>water</span> today.
          </p>
        </div>
        <div className={'power_part'}>
          <div className={'power_wrapper'}>
            {completedPowerTraining.fill(
              <div
                className={'icon completedPower'}
                onClick={handleCompletedGoal}
              ></div>
            )}
            {plainPowerTraining.fill(
              <div className={'icon power'} onClick={handleCompletedGoal}></div>
            )}
          </div>
          <p className={'title'}>
            *click if you have done <span>power</span> training
          </p>
        </div>
        <div className={'cardio_part'}>
          <div className={'cardio_wrapper'}>
            {completedCardioTraining.fill(
              <div
                className={'icon completedCardio'}
                onClick={handleCompletedGoal}
              ></div>
            )}
            {plainCardioTraining.fill(
              <div
                className={'icon cardio'}
                onClick={handleCompletedGoal}
              ></div>
            )}
          </div>
          <p className={'title'}>
            *click if you have done <span>cardio</span> training
          </p>
        </div>
      </ActivityStyleWrapper>
    );
  } else {
    return <ActivityStyleWrapper>hello</ActivityStyleWrapper>;
  }
};

export default GoalsManagement;
