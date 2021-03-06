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
  const allGoals = useSelector(currentGoalsSelector);
  const arrayOfWeight = props.data.map((item) => item.weight);
  const currentGoals = allGoals.find((goal) => goal.date == props.date);

  const data = {
    labels: props.data.map((item) => item.date.slice(0, 5)),
    datasets: [
      {
        label: 'Desired weight',
        data: arrayOfWeight.map(() => currentGoals.weight),
        borderColor: '#d697d8',
        backgroundColor: '#e6e6e6',
      },
      {
        label: 'Current weight',
        data: [
          ...arrayOfWeight,
          Math.min.apply(null, arrayOfWeight) - 3,
          Math.max.apply(null, arrayOfWeight) + 3,
        ],
        borderColor: '#3eb6b0',
        backgroundColor: '#e6e6e6',
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
