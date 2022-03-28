import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { currentGoalsSelector } from '../../../store/selectors/goals';
import { allActivitiesDoneSelector } from '../../../store/selectors/analytics';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieStyle = styled.div`
  margin: 30px auto;
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .power,
  .cardio {
    padding: 10px;
  }
`;

export function TrainingAnalytics(props) {
  const goals = useSelector(currentGoalsSelector);
  const numberPowerTrainingForGoal = goals.powerTraining;
  const numberCardioTrainingForGoal = goals.cardioTraining;

  const trainingsFullfilled = useSelector(allActivitiesDoneSelector);

  let thisMounthData = {};

  trainingsFullfilled.filter((item) =>
    item.date.split('.').slice(1, -1).join('') == props.mounth + 1 &&
    item.date.split('.').slice(-1).join('') == props.year
      ? (thisMounthData = item)
      : thisMounthData
  );

  const numberPowerTrainingDone = thisMounthData.numberPowerTraining;
  const numberCardioTrainingDone = thisMounthData.numberCardioTraining;

  const dataPower = {
    labels: ['Power trainings you have done', 'Power trainigs(your goal)'],
    datasets: [
      {
        label: 'dvdsfbryjtydmn ',
        data: [numberPowerTrainingDone, numberPowerTrainingForGoal],
        backgroundColor: ['#3eb6b0', '#262626'],
        borderColor: ['#e6e6e6', '#e6e6e6'],
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
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
        text: `Analytics of your power training (number)`,
        font: { size: 20 },
      },
    },
  };
  const options2 = {
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
        text: `Analytics of your cardio training (number)`,
        font: { size: 20 },
      },
    },
  };
  const dataCardio = {
    labels: ['Cardio trainings you have done', 'Cardio trainigs(your goal)'],
    datasets: [
      {
        label: '',
        data: [numberCardioTrainingDone, numberCardioTrainingForGoal],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'gray'],
        borderColor: ['#e6e6e6', '#e6e6e6'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <PieStyle>
      <Pie data={dataPower} options={options1} className={'power'} />
      <Pie data={dataCardio} options={options2} className={'cardio'} />
    </PieStyle>
  );
}
