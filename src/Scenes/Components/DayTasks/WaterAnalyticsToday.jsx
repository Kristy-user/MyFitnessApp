import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  addNewMonthWaterAnalytics,
  refreshWaterAnalytics,
} from '../../../store/actions/analytics';
import {
  isLoadedDataSelector,
  waterDoneSelector,
} from '../../../store/selectors/analytics';
import PromptWindow from './PromptWindow';

const WaterStyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & ul {
    display: flex;
    flex-direction: row;
    margin: 20px 0;
  }
  .icon:before {
    margin: 10px;
    text-shadow: #fff;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 50px;
    cursor: pointer;
    color: ${(props) => props.theme.unmarckColor};
  }
  .glass:hover:before {
    color: ${(props) => props.theme.fontColor};
  }
  .glass:before {
    content: '\f7a0';
  }
  .fullglass:before {
    content: '\f7a0';
  }
  .fullglass:before {
    color: ${(props) => props.theme.fontColor};
  }
`;

const WaterAnalyticsToday = ({ date, userId, currentGoals }) => {
  const userWaterGoalFullfilling = useSelector(waterDoneSelector);
  const allWaterGlasses = currentGoals ? currentGoals.water / 300 : 0;
  const dispatch = useDispatch();
  const dataIsLoaded = useSelector(isLoadedDataSelector);

  const [thisDayWaterInfo, setThisDayWaterInfo] = useState(
    userWaterGoalFullfilling.find(
      (item) => item.date === date.toLocaleDateString()
    )
  );

  useEffect(() => {
    setThisDayWaterInfo(
      userWaterGoalFullfilling.find(
        (item) => item.date === date.toLocaleDateString()
      )
    );
  }, [date, userWaterGoalFullfilling]);

  const [numberFullGlass, setNumberFullGlass] = useState(
    thisDayWaterInfo && thisDayWaterInfo.date == date.toLocaleDateString()
      ? thisDayWaterInfo.numberFullGlass
      : 0
  );

  useEffect(() => {
    if (
      thisDayWaterInfo &&
      thisDayWaterInfo.date == date.toLocaleDateString()
    ) {
      setNumberFullGlass(thisDayWaterInfo.numberFullGlass);
    } else setNumberFullGlass(0);
  }, [date, thisDayWaterInfo]);

  function sendWaterAnlyticsToServer() {
    let data = {
      numberFullGlass,
      userId,
      date: date.toLocaleDateString(),
    };
    if (
      thisDayWaterInfo &&
      thisDayWaterInfo.date == date.toLocaleDateString()
    ) {
      dispatch(refreshWaterAnalytics(data, thisDayWaterInfo.id));
    } else if (dataIsLoaded) {
      dispatch(addNewMonthWaterAnalytics(data));
    }
  }
  const [dataWaterUpdate, setDataWaterUpdate] = useState();
  useEffect(() => {
    if (dataWaterUpdate) {
      sendWaterAnlyticsToServer();
    }
  }, [dataWaterUpdate]);

  if (!dataIsLoaded) {
    return <Loader />;
  } else {
    return (
      <WaterStyleWrapper>
        <ul>
          {Array.from({ length: numberFullGlass }).map((item, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  setNumberFullGlass(numberFullGlass - 1);

                  setDataWaterUpdate(Date.now());
                }}
                className={'icon fullglass'}
              ></div>
              <p>300ml</p>
            </li>
          ))}
        </ul>

        <ul>
          {Array.from({ length: allWaterGlasses - numberFullGlass }).map(
            (item, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    setNumberFullGlass(numberFullGlass + 1);
                    setDataWaterUpdate(Date.now());
                  }}
                  className={'icon glass'}
                ></div>
                <p>300ml</p>
              </li>
            )
          )}
        </ul>
      </WaterStyleWrapper>
    );
  }
};

export default WaterAnalyticsToday;
