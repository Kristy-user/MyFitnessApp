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
import { everyDayAnalyticsSelector } from '../../../store/selectors/analyticsToday';
import { userIdSelector } from '../../../store/selectors/user';
import { loadingTodayAnalytics } from '../../../store/actions/todayAnalytics';
import fakeServerAPI from '../../../api/fakeServerAPI';
import { goalsSelector } from '../../../store/selectors/goals';
import styled from 'styled-components';
import { TrainingAnalytics } from './TrainingAnalytics';

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
  }
  .tittle {
    font-size: 16px;
    align-self: center;
    padding: 9.5px;
    background-color: ${(props) => props.theme.buttonColor};
    border-radius: 6px 0 0 6px;
    color: ${(props) => props.theme.fontColor};
  }

  .css-1s2u09g-control {
    border: none;
    border-radius: 0 6px 6px 0;
    width: fit-content;
    background-color: ${(props) => props.theme.buttonColor};
    .css-qc6sy-singleValue {
      color: ${(props) => props.theme.fontColor};
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
  const [value, setValue] = useState(mounth[new Date().getMonth()]);

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
  let indexOfMounth = mounth.map((item) => item.value).indexOf(value.value);

  const labels = sortAnalyticsForDays.map((item) =>
    new Date(item.date.split('.').reverse().join('-')).getMonth() == value.value
      ? item.date.split('').splice(0, 5).join('')
      : null
  );
  console.log(
    sortAnalyticsForDays.map((item) =>
      item.date.split('').splice(3, 2).join('')
    ),
    value.value
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Analytics of your steps (${mounth[value.value].label})`,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Steps goal',
        data: labels.map((item) => goals.steps),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Steps you done',
        data: sortAnalyticsForDays.map((item) =>
          item.date.split('').splice(3, 2).join('') == +value.value + 1
            ? item.numberSteps
            : null
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <AnalyticsStyle>
      <Bar options={options} data={data} />
      <div className={'chooseForm'}>
        <div className={'tittle'}>Choose mounth:</div>
        <Select
          className={'selectValue'}
          value={value}
          options={mounth}
          onChange={setValue}
        />
      </div>
      <TrainingAnalytics />
    </AnalyticsStyle>
  );
};

export default Analytics;
