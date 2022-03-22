import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieStyle = styled.div`
  margin: 30px auto;
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export function TrainingAnalytics() {
  const dataPower = {
    labels: ['Power trainigs(your goal)', 'Power trainings you have done'],
    datasets: [
      {
        label: 'dvdsfbryjtydmn ',
        data: [8, 2],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const dataCardio = {
    labels: ['Cardio trainigs(your goal)', 'Cardio trainings you have done'],
    datasets: [
      {
        label: '',
        data: [8, 2],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <PieStyle>
      <Pie data={dataPower} />
      <Pie data={dataCardio} />
    </PieStyle>
  );
}
