import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { goalsSelector } from '../../store/selectors/goals';

import { userIdSelector } from '../../store/selectors/user';
import {
  loadingUserWaterAnalytics,
  refreshWaterAnalytics,
} from '../../store/actions/analytics';
import fakeServerAPI from '../../api/fakeServerAPI';
import { useDispatch } from 'react-redux';
import { analyticsSelector } from '../../store/selectors/analytics';

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
  const dispatch = useDispatch();
  const allWaterGlasses = goals.water / 300;

  useEffect(() => {
    fakeServerAPI.get('/dataAnalytics').then((response) => {
      if (response.data[userId]) {
        dispatch(
          loadingUserWaterAnalytics(response.data[userId].numberFullGlass)
        );
      }
    });
  }, []);

  const amountFullGlasses = useSelector(analyticsSelector);
  const [numberFullGlass, setNumberFullGlass] = useState(
    amountFullGlasses ? amountFullGlasses : 0
  );

  const fullGlass = [];
  const emptyGlass = [];

  for (let i = 0; i < numberFullGlass; i++) {
    emptyGlass.push(
      <div className={'fullglass'} onClick={handleFullGlass} key={i}>
        <p>300ml</p>
      </div>
    );
  }
  let numberEmptyGlass = allWaterGlasses - numberFullGlass;
  for (let i = 0; i < numberEmptyGlass; i++) {
    emptyGlass.push(
      <div className={'glass'} onClick={handleFullGlass} key={i + 8}>
        <p>300ml</p>
      </div>
    );
  }

  function handleFullGlass(e) {
    if (e.target.className === 'glass') {
      setNumberFullGlass(numberFullGlass + 1);
    } else if (e.target.className === 'fullglass') {
      setNumberFullGlass(numberFullGlass - 1);
    }
  }
  useEffect(() => {
    dispatch(refreshWaterAnalytics(numberFullGlass, userId));
  }, [numberFullGlass]);

  if (goals.water) {
    return (
      <GlassStyleWrapper>
        <div className={'glass_title'}>
          <p>Click on the glass if you drank water.</p>
        </div>
        <div className={'glass_wrapper'}>
          {emptyGlass}
          {fullGlass}
        </div>
      </GlassStyleWrapper>
    );
  } else {
    return <GlassStyleWrapper></GlassStyleWrapper>;
  }
};

export default WaterBalance;
