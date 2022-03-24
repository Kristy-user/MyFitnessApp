import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useDispatch, useSelector } from 'react-redux';
import { everyDayAnalyticsSelector } from 'store/selectors/analyticsToday';
import { userIdSelector } from 'store/selectors/user';
import { loadingTodayAnalytics } from 'store/actions/todayAnalytics';
import fakeServerAPI from 'api/fakeServerAPI';
import { goalsSelector } from 'store/selectors/goals';
import styled from 'styled-components';
import { TrainingAnalytics } from 'Layouts/Components/Analytics/TrainingAnalytics';
import WeightAnalytics from 'Layouts/Components/Analytics/WeightAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsStyle = styled.div`
  .chooseForm {
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .tittle {
    font-size: 16px;
    color: ${(props) => props.theme.headerBackGroundColor};
    padding: 9.5px;
    background-color: gray;
    border-radius: 6px 0 0 6px;
  }

  .css-1s2u09g-control {
    margin-right: 10px;
    border: none;
    border-radius: 0 6px 6px 0;
    width: fit-content;
    background-color: gray;
    .css-qc6sy-singleValue {
      color: rgb(197, 230, 227);
      text-shadow: 0px 0px 2px ${(props) => props.theme.buttonColor};
    }
  }
`;

const Analytics = () => {
  const goals = useSelector(goalsSelector);
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const mounth = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];
  const years = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
    { value: 2024, label: 2024 },
    { value: 2025, label: 2025 },
  ];

  const [valueMounth, setValueMounth] = useState(mounth[new Date().getMonth()]);
  const [valueYears, setValueYears] = useState(
    years.find((item) => item.value == new Date().getFullYear())
  );

  useEffect(() => {
    fakeServerAPI
      .get(`/dataTodayAnalytics?userId=${userId}`)
      .then((response) => {
        dispatch(loadingTodayAnalytics(response.data));
      });
  }, []);
  const analyticsForDays = useSelector(everyDayAnalyticsSelector);
  const sortAnalyticsForDays = [...analyticsForDays].sort(
    (a, b) =>
      new Date(a.date.split('.').reverse().join('-')) -
      new Date(b.date.split('.').reverse().join('-'))
  );

  const labels = sortAnalyticsForDays.map((item) =>
    new Date(item.date.split('.').reverse().join('-')).getMonth() ==
      valueMounth.value &&
    new Date(item.date.split('.').reverse().join('-')).getFullYear() ==
      valueYears.value
      ? item.date.split('').splice(0, 5).join('')
      : null
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Analytics of your steps (${mounth[valueMounth.value].label}, ${
          valueYears.value
        })`,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Steps goal',
        data: labels.map((item) => goals.steps),
        borderColor: '#e6e6e6',
        backgroundColor: 'gray',
      },
      {
        label: 'Steps you done',
        data: sortAnalyticsForDays.map((item) =>
          item.date.split('').splice(3, 2).join('') == +valueMounth.value + 1
            ? item.numberSteps
            : null
        ),
        borderColor: '#e6e6e6',
        backgroundColor: '#3eb6b0',
      },
    ],
  };

  return (
    <AnalyticsStyle>
      <div className={'chooseForm'}>
        <div className={'tittle'}>Choose mounth:</div>
        <Select
          className={'selectValueMounth'}
          value={valueMounth}
          options={mounth}
          onChange={setValueMounth}
        />{' '}
        <div className={'tittle'}>Choose year:</div>
        <Select
          className={'selectValueYears'}
          value={valueYears}
          options={years}
          onChange={setValueYears}
        />
      </div>
      <Bar options={options} data={data} />
      <TrainingAnalytics mounth={valueMounth.value} year={valueYears.value} />
      <WeightAnalytics mounth={valueMounth.value} year={valueYears.value} />
    </AnalyticsStyle>
  );
};

export default Analytics;
