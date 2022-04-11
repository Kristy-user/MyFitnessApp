import React, { useEffect, useState } from 'react';

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
import { userIdSelector } from 'store/selectors/user';
import { loadingTodayAnalytics } from 'store/actions/todayAnalytics';
import fakeServerAPI from 'api/fakeServerAPI';
import styled from 'styled-components';
import { TrainingAnalytics } from 'Scenes/Components/Analytics/TrainingAnalytics';
import WeightAnalytics from 'Scenes/Components/Analytics/WeightAnalytics';
import { currentGoalsSelector } from '../../store/selectors/goals';
import { userAnalyticsDateSelector } from '../../store/selectors/todayAnalytics';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    align-self: center;
    font-size: 22px;
    color: black;
  }
  .date_picker {
    border: none;
    font-size: 22px;
    text-align: center;

    margin-left: 10px;
    padding: 3px;
    background-color: ${(props) => props.theme.appBackGroundColor};
    color: ${(props) => props.theme.headerBackGroundColor};
    border-radius: 6px;
    &:focus {
      outline: none;
    }
  }
  .react-datepicker-wrapper {
    width: max-content;
    div {
      width: max-content;
    }
    input {
      max-width: 130px;
    }
  }
  .steps {
    width: 80%;
    margin: 25px auto;
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
  const allGoals = useSelector(currentGoalsSelector);
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  let currentDate = startDate.toLocaleDateString().slice(-7);
  const currentGoals = allGoals.find((goal) => goal.date == currentDate);

  useEffect(() => {
    fakeServerAPI
      .get(`/dataTodayAnalytics?userId=${userId}`)
      .then((response) => {
        dispatch(loadingTodayAnalytics(response.data));
      })
      .catch((error) => error);
  }, []);

  const analyticsForDays = useSelector(userAnalyticsDateSelector);

  const sortAnalyticsForDays = [...analyticsForDays]
    .sort(
      (a, b) =>
        new Date(a.date.split('.').reverse().join('-')) -
        new Date(b.date.split('.').reverse().join('-'))
    )
    .filter((item) => item.date.slice(-7) == currentDate);

  const labels = sortAnalyticsForDays.map((item) => item.date.slice(-7));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: `Analytics of your steps for (${currentDate})`,
        font: { size: 20 },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Steps goal',
        data: labels.map(() => currentGoals.steps),
        borderColor: '#e6e6e6',
        backgroundColor: 'gray',
      },
      {
        label: 'Steps you done',
        data: sortAnalyticsForDays.map((item) => item.numberSteps),
        borderColor: '#e6e6e6',
        backgroundColor: '#3eb6b0',
      },
    ],
  };

  return (
    <AnalyticsStyle>
      <div className={'chooseForm'}>
        <div className={'tittle'}>Choose mounth:</div>
        <DatePicker
          className={'date_picker'}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className={'steps'}>
        {' '}
        <Bar options={options} data={data} />
      </div>

      <TrainingAnalytics date={currentDate} />
      <WeightAnalytics date={currentDate} data={sortAnalyticsForDays} />
    </AnalyticsStyle>
  );
};

export default Analytics;
