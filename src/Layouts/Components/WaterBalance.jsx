import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { goalsSelector } from '../../store/selectors/goals';
import glassIcon from '../../assets/images/glass.svg';
import { userIdSelector } from '../../store/selectors/user';
import {
  loadingDrankWater,
  loadingUserWaterPerformance,
  refreshWaterPerformance,
  settingUserWaterPerformance,
} from '../../store/actions/performance';
import fakeServerAPI from '../../api/fakeServerAPI';
import { useDispatch } from 'react-redux';
import { performanceSelector } from '../../store/selectors/performance';

const GlassStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  & p {
    color: ${(props) => props.theme.fontColor};
  }
  .glass_title {
    margin-top: 50px;
    font-size: 22px;
  }
  .glass_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px;
  }
  .glass:before,
  .fullglass:before {
    margin: 10px;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 50px;
    content: '\f7a0';
    color: gray;
    cursor: pointer;
  }
  .fullglass:before {
    color: #207ca7;
  }
`;

const WaterBalance = () => {
  const userId = useSelector(userIdSelector);
  const goals = useSelector(goalsSelector);
  const amountFullGlasses = useSelector(performanceSelector);
  const [numberFullGlass, setNumberFullGlass] = useState(amountFullGlasses);
  const dispatch = useDispatch();

  const allWaterGlasses = goals.water / 300;

  useEffect(() => {
    fakeServerAPI.get('/dataPerformance').then((response) => {
      if (response.data[userId]) {
        dispatch(
          loadingUserWaterPerformance(response.data[userId].numberFullGlass)
        );
      }
    });
  }, []);

  const fullGlass = [];
  const emptyglass = [];

  if (amountFullGlasses > 0) {
    console.log(amountFullGlasses);
    for (let i = 0; i < amountFullGlasses; i++) {
      emptyglass.push(
        <div className={'fullglass'} onClick={handleFullGlass} key={i}>
          <p>300ml</p>
        </div>
      );
    }
    let numberEmptyGlass = allWaterGlasses - amountFullGlasses;
    for (let i = 0; i < numberEmptyGlass; i++) {
      emptyglass.push(
        <div className={'glass'} onClick={handleFullGlass} key={i + 8}>
          <p>300ml</p>
        </div>
      );
    }
    console.log(numberEmptyGlass);
  } else {
    console.log(allWaterGlasses);
    for (let i = 0; i < allWaterGlasses; i++) {
      emptyglass.push(
        <div className={'glass'} onClick={handleFullGlass} key={i}>
          <p>300ml</p>
        </div>
      );
    }
  }

  function handleFullGlass(e) {
    if (e.target.className === 'glass') {
      setNumberFullGlass(numberFullGlass + 1);
    } else if (e.target.className === 'fullglass') {
      setNumberFullGlass(numberFullGlass - 1);
    }
    dispatch(refreshWaterPerformance(numberFullGlass, userId));
  }
  if (goals.water) {
    return (
      <GlassStyleWrapper>
        <div className={'glass_title'}>
          <p>Click on the glass if you drank water.</p>
        </div>
        <div className={'glass_wrapper'}>
          {fullGlass}
          {emptyglass}
        </div>
      </GlassStyleWrapper>
    );
  } else {
    return <GlassStyleWrapper></GlassStyleWrapper>;
  }
};

export default WaterBalance;
