import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  addNewMonthTrainingAnalytics,
  loadingUserAnalytics,
  refreshTrainingAnalytics,
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
import PowerTrainingIcon from '../Analytics/PowerTrainingIcon';
import CardioTrainingIcon from '../Analytics/CardioTrainingIcon';
import WaterAnalytics from '../Analytics/WaterAnalytics';

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

  .power_wrapper,
  .cardio_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px;
    ul {
      display: flex;
      flex-direction: row;
    }
  }

  .water_part {
    border-bottom: 1px solid gray;
    padding-bottom: 15px;
  }
`;

const GoalsManagement = (props) => {
  const userId = useSelector(userIdSelector);
  const userGoals = useSelector(currentGoalsSelector);
  const dispatch = useDispatch();
  const userGoalsFullfilling = useSelector(allActivitiesDoneSelector);
  const dataIsLoaded = useSelector(isLoadedDataSelector);

  const getMonth = (date) => date.toLocaleDateString().slice(-7);
  const monthChecked = getMonth(props.date);

  const currentGoals = userGoals.find((goal) => goal.date == monthChecked);

  const allPowerTraining = currentGoals ? currentGoals.powerTraining : 0;
  const allCardioTraining = currentGoals ? currentGoals.cardioTraining : 0;

  useEffect(() => {
    dispatch(loadingUserAnalytics(userId));
  }, []);

  const [thisMonthTrainingData, setThisMonthTrainingData] = useState(
    userGoalsFullfilling.find((item) => item.date.slice(-7) === monthChecked)
  );
  useEffect(() => {
    setThisMonthTrainingData(
      userGoalsFullfilling.find((item) => item.date.slice(-7) === monthChecked)
    );
  }, [props.date, userGoalsFullfilling]);

  const [numberPowerTraining, setNumberPowerTraining] = useState(
    thisMonthTrainingData ? thisMonthTrainingData.numberPowerTraining : 0
  );
  const [numberCardioTraining, setNumberCardioTraining] = useState(
    thisMonthTrainingData ? thisMonthTrainingData.numberCardioTraining : 0
  );

  useEffect(() => {
    if (!thisMonthTrainingData) {
      return;
    } else {
      setNumberPowerTraining(thisMonthTrainingData.numberPowerTraining);
      setNumberCardioTraining(thisMonthTrainingData.numberCardioTraining);
    }
  }, [props.date, thisMonthTrainingData]);

  function sendDataTrainingToServer() {
    let data = {
      numberPowerTraining,
      numberCardioTraining,
      userId,
      date: props.date.toLocaleDateString(),
    };
    if (thisMonthTrainingData) {
      dispatch(refreshTrainingAnalytics(data, thisMonthTrainingData.id));
    } else if (dataIsLoaded) {
      dispatch(addNewMonthTrainingAnalytics(data));
    }
  }

  const [dataTrainingUpdate, setDataTrainingUpdate] = useState();

  useEffect(() => {
    if (dataTrainingUpdate) {
      sendDataTrainingToServer();
    }
  }, [dataTrainingUpdate]);

  if (!dataIsLoaded) {
    return <Loader />;
  } else {
    return (
      <ActivityStyleWrapper>
        <div className={'water_part'}>
          <WaterAnalytics
            date={props.date}
            userId={userId}
            currentGoals={currentGoals}
          />
          <p className={'title'}>
            *click if you drank <span>water</span> today.
          </p>
        </div>
        <p className={'analytic_title'}>current data for Month</p>
        <div className={'power_part'}>
          <div className={'power_wrapper'}>
            <ul>
              {Array.from({ length: numberPowerTraining }).map(
                (item, index) => (
                  <PowerTrainingIcon
                    key={index}
                    setNewValue={() => {
                      setNumberPowerTraining(numberPowerTraining - 1);
                      setDataTrainingUpdate(Date.now());
                    }}
                    name={'completed'}
                  />
                )
              )}
            </ul>
            <ul>
              {Array.from({
                length: allPowerTraining - numberPowerTraining,
              }).map((item, index) => (
                <PowerTrainingIcon
                  key={index}
                  setNewValue={() => {
                    setNumberPowerTraining(numberPowerTraining + 1);
                    setDataTrainingUpdate(Date.now());
                  }}
                  name={''}
                />
              ))}
            </ul>
          </div>
          <p className={'title'}>
            *click if you have done <span>power</span> training
          </p>
        </div>
        <div className={'cardio_part'}>
          <div className={'cardio_wrapper'}>
            <ul>
              {Array.from({ length: numberCardioTraining }).map(
                (item, index) => (
                  <CardioTrainingIcon
                    key={index}
                    name={'cardio'}
                    setNewValue={() => {
                      setNumberCardioTraining(numberCardioTraining - 1);
                      setDataTrainingUpdate(Date.now());
                    }}
                  />
                )
              )}
            </ul>
            <ul>
              {Array.from({
                length: allCardioTraining - numberCardioTraining,
              }).map((item, index) => (
                <CardioTrainingIcon
                  key={index}
                  className={''}
                  setNewValue={() => {
                    setNumberCardioTraining(numberCardioTraining + 1);
                    setDataTrainingUpdate(Date.now());
                  }}
                />
              ))}
            </ul>
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
