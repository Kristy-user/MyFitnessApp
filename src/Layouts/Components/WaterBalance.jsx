import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { goalsSelector } from '../../store/selectors/goals';
import glassIcon from '../../assets/images/glass.svg';
import { userIdSelector } from '../../store/selectors/user';
import {
  loadingDrankWater,
  loadingUserWaterPerformance,
  settingUserWaterPerformance,
} from '../../store/actions/performance';
import fakeServerAPI from '../../api/fakeServerAPI';
import { useDispatch } from 'react-redux';
import { performanceSelector } from '../../store/selectors/performance';

const GlassStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  .glass_title {
    color: ${(props) => props.theme.fontColor};
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
    color: blue;
  }
`;

const WaterBalance = () => {
  const [numberFullGlass, setNumberFullGlass] = useState(0);
  const userId = useSelector(userIdSelector);
  const goals = useSelector(goalsSelector);
  const dispatch = useDispatch();

  const amountOfWaterGlasses = goals.water / 300;

  const glass = [];
  for (let i = 0; i < amountOfWaterGlasses; i++) {
    glass.push(
      <div className={'glass'} onClick={handleFullGlass} key={i}></div>
    );
  }
  function handleFullGlass(e) {
    if (e.target.className === 'glass') {
      setNumberFullGlass(numberFullGlass + 1);
      e.target.className = 'fullglass';
    } else if (e.target.className === 'fullglass') {
      setNumberFullGlass(numberFullGlass - 1);
      e.target.className = 'glass';
    }
  }

  useEffect(() => {
    fakeServerAPI
      .post('/dataPerformance', {
        [userId]: {
          numberFullGlass: numberFullGlass,
        },
      })
      .then(() => dispatch(settingUserWaterPerformance(numberFullGlass)));
  }, [numberFullGlass]);

  return (
    <GlassStyleWrapper>
      <div className={'glass_title'}>
        <p>Mark how much water you drank.</p>
      </div>
      <div className={'glass_wrapper'}> {glass}</div>
    </GlassStyleWrapper>
  );
};

export default WaterBalance;
