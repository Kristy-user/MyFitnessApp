import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { currentGoalsSelector } from '../../../store/selectors/goals';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineStyle = styled.div`
  width: 80%;
  margin: 30px auto;
  font-size: 20px;
`;

export const options = {
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
      text: 'Analitycs of your weight, (kg)',
      font: { size: 20 },
    },
  },
};

const WeightAnalytics = (props) => {
  const goals = useSelector(currentGoalsSelector);

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Desired weight',
        data: props.labels.map((item) => goals.weight),
        borderColor: '#ec9696',
        backgroundColor: '#e6e6e6',
        // borderWidth: 2,
      },
      {
        label: 'Current weight',
        data: props.data.map((item) =>
          item.date.split('').splice(3, 2).join('') == +props.mounth + 1
            ? item.weight
            : null
        ),
        borderColor: '#3eb6b0',
        backgroundColor: '#e6e6e6',
        // borderWidth: 3,
      },
    ],
  };

  return (
    <LineStyle>
      <Line options={options} data={data} />
    </LineStyle>
  );
};
export default WeightAnalytics;
