import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  addNewMonthAnalytics,
  loadingUserAnalytics,
  loadingUserAnalyticsStart,
  loadingUserAnalyticsSuccess,
  refreshAnalytics,
} from '../../../store/actions/analytics';
import Loader from '../../../Components/Loader';
import { useDispatch } from 'react-redux';
import {
  allActivitiesDoneSelector,
  isDataSetSelector,
  isLoadedDataSelector,
} from '../../../store/selectors/analytics';
import { userIdSelector } from '../../../store/selectors/user';
import { currentGoalsSelector } from '../../../store/selectors/goals';
import WaterIcon from '../Analytics/WaterIcon';
import PowerTrainingIcon from '../Analytics/PowerTrainingIcon';
import CardioTrainingIcon from '../Analytics/CardioTrainingIcon';
import fakeServerAPI from '../../../api/fakeServerAPI';

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
`;

const GoalsManagement = (props) => {
  const userId = useSelector(userIdSelector);
  const currentGoals = useSelector(currentGoalsSelector);
  const dispatch = useDispatch();
  const userGoalsFullfilling = useSelector(allActivitiesDoneSelector);
  const dataIsLoaded = useSelector(isLoadedDataSelector);
  const dataIsSet = useSelector(isDataSetSelector);

  const getMonth = (date) =>
    date.toLocaleDateString().split('.').slice(-2).join('');
  const monthChecked = getMonth(props.date);

  const allWaterGlasses = currentGoals.water / 300;
  const allPowerTraining = currentGoals.powerTraining;
  const allCardioTraining = currentGoals.cardioTraining;

  useEffect(() => {
    dispatch(loadingUserAnalyticsSuccess(false));
    fakeServerAPI
      .get(`/dataAnalytics?userId=${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserAnalyticsStart(response.data));
        }
      })
      .then(() => dispatch(loadingUserAnalyticsSuccess(true)))
      .catch((error) => error);
  }, []);

  const [thisMonthData, setThisMonthData] = useState(
    userGoalsFullfilling.find(
      (item) => item.date.split('.').slice(-2).join('') === monthChecked
    )
  );
  useEffect(() => {
    setThisMonthData(
      userGoalsFullfilling.find(
        (item) => item.date.split('.').slice(-2).join('') === monthChecked
      )
    );
  }, [props.date, userGoalsFullfilling]);

  const [numberFullGlass, setNumberFullGlass] = useState(
    thisMonthData && thisMonthData.date == new Date().toLocaleDateString()
      ? thisMonthData.numberFullGlass
      : 0
  );
  const [numberPowerTraining, setNumberPowerTraining] = useState(
    thisMonthData ? thisMonthData.numberPowerTraining : 0
  );
  const [numberCardioTraining, setNumberCardioTraining] = useState(
    thisMonthData ? thisMonthData.numberCardioTraining : 0
  );
  useEffect(() => {
    if (!thisMonthData) {
      return;
    } else {
      thisMonthData.date == new Date().toLocaleDateString()
        ? setNumberFullGlass(thisMonthData.numberFullGlass)
        : setNumberFullGlass(0);
      setNumberPowerTraining(thisMonthData.numberPowerTraining);
      setNumberCardioTraining(thisMonthData.numberCardioTraining);
    }
  }, [thisMonthData, props.date]);

  const [dataChange, setDataChange] = useState(0);

  function handleCompletedGoal(e) {
    if (!dataIsSet) return;
    else {
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
      setDataChange(dataChange + 1);
    }
  }

  function createData() {
    let analyticsData = {
      numberFullGlass,
      numberPowerTraining,
      numberCardioTraining,
      userId,
      date: props.date.toLocaleDateString(),
    };
    return analyticsData;
  }

  function sendDataToServer(data) {
    if (thisMonthData) {
      dispatch(refreshAnalytics(data, thisMonthData.id));
    } else if (dataIsLoaded) {
      dispatch(addNewMonthAnalytics(data));
    }
  }

  useEffect(() => {
    sendDataToServer(createData());
  }, [dataChange]);

  if (!dataIsLoaded) {
    return <Loader />;
  } else {
    return (
      <ActivityStyleWrapper>
        <div className={'water_part'}>
          <div className={'water_wrapper'}>
            {Array.from({ length: numberFullGlass }).map((item, index) => (
              <WaterIcon
                key={index}
                handleCompletedGoal={handleCompletedGoal}
                name={'full'}
              />
            ))}
            {Array.from({ length: allWaterGlasses - numberFullGlass }).map(
              (item, index) => (
                <WaterIcon
                  key={index}
                  handleCompletedGoal={handleCompletedGoal}
                  name={''}
                />
              )
            )}
          </div>
          <p className={'title'}>
            *click if you drank <span>water</span> today.
          </p>
        </div>
        <p className={'analytic_title'}>current data for Month</p>
        <div className={'power_part'}>
          <div className={'power_wrapper'}>
            {Array.from({ length: numberPowerTraining }).map((item, index) => (
              <PowerTrainingIcon
                key={index}
                handleCompletedGoal={handleCompletedGoal}
                name={'completed'}
              />
            ))}
            {Array.from({
              length: allPowerTraining - numberPowerTraining,
            }).map((item, index) => (
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
            {Array.from({ length: numberCardioTraining }).map((item, index) => (
              <CardioTrainingIcon
                key={index}
                name={'cardio'}
                handleCompletedGoal={handleCompletedGoal}
              />
            ))}
            {Array.from({
              length: allCardioTraining - numberCardioTraining,
            }).map((item, index) => (
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
  }
};

export default GoalsManagement;
