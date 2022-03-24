import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { goalsSelector } from '../../store/selectors/goals';
import { userIdSelector } from '../../store/selectors/user';
import {
  addNewMounthAnalytics,
  loadingUserAnalytics,
  loadingUserAnalyticsSuccess,
  refreshAnalytics,
} from '../../store/actions/analytics';
import fakeServerAPI from '../../api/fakeServerAPI';
import { useDispatch } from 'react-redux';
import {
  allActivitiesDoneSelector,
  isLoadedDataSelector,
  isSelector,
} from '../../store/selectors/analytics';
import { StyledLoader } from '../../Components/Loader';

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

const GoalsManagement = () => {
  const userId = useSelector(userIdSelector);
  const goals = useSelector(goalsSelector);
  const dispatch = useDispatch();
  const allWaterGlasses = goals.water / 300;
  const userGoalsFullfilling = useSelector(allActivitiesDoneSelector);
  const dataIsLoaded = useSelector(isLoadedDataSelector);

  const mounthNow = new Date()
    .toLocaleDateString()
    .split('.')
    .slice(-2)
    .join('');

  useEffect(() => {
    dispatch(loadingUserAnalytics(userId));
  }, []);
  let thisMounthData = {};
  thisMounthData =
    userGoalsFullfilling.find(
      (item) => item.date.split('.').slice(-2).join('') === mounthNow
    ) || thisMounthData;

  const [numberFullGlass, setNumberFullGlass] = useState(
    thisMounthData.date == new Date().toLocaleDateString()
      ? thisMounthData.numberFullGlass
      : 0
  );
  const [numberPowerTraining, setNumberPowerTraining] = useState(
    thisMounthData.numberPowerTraining ? thisMounthData.numberPowerTraining : 0
  );
  const [numberCardioTraining, setNumberCardioTraining] = useState(
    thisMounthData.numberCardioTraining
      ? thisMounthData.numberCardioTraining
      : 0
  );

  const glasses = [];
  const fullGlasses = [];
  glasses.length = allWaterGlasses - numberFullGlass;
  fullGlasses.length = numberFullGlass;

  const allPowerTraining = goals.powerTraining;
  let plainPowerTraining = [];
  let completedPowerTraining = [];
  completedPowerTraining.length = numberPowerTraining;
  plainPowerTraining.length = allPowerTraining - numberPowerTraining;

  const allCardioTraining = goals.cardioTraining;
  let plainCardioTraining = [];
  let completedCardioTraining = [];
  completedCardioTraining.length = numberCardioTraining;
  plainCardioTraining.length = allCardioTraining - numberCardioTraining;

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
      date: new Date().toLocaleDateString(),
    };
    if (dataIsLoaded) {
      thisMounthData.date &&
      thisMounthData.date.split('.').slice(-2).join('') == mounthNow
        ? dispatch(refreshAnalytics(analyticsData, thisMounthData.id))
        : dispatch(addNewMounthAnalytics(analyticsData));
    }
  }, [numberFullGlass, numberPowerTraining, numberCardioTraining]);

  console.log(goals.water, dataIsLoaded);
  if (dataIsLoaded) {
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
        <p className={'analytic_title'}>current data for mounth</p>
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
    return <ActivityStyleWrapper></ActivityStyleWrapper>;
  }
};

export default GoalsManagement;
