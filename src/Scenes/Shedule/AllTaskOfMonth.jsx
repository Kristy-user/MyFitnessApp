import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TasksList from '../../Layouts/Components/Tasks/TasksList';
import { taskListSelector } from '../../store/selectors/tasksList';

const AllTaskStyle = styled.div`
  margin-top: 20px;
  h5 {
    text-transform: uppercase;
    font-size: 18px;
    padding: 5px;
    margin: 15px 0 5px 0;
    text-shadow: 0px 0px 1px ${(props) => props.theme.fontColor};
    color: gray;

    text-align: center;
  }
  input {
    text-align: left;
  }
`;

const AllTaskOfMonth = (props) => {
  const tasksList = useSelector(taskListSelector);
  let tasksOfThisMounth = tasksList
    .filter(
      (task) =>
        task.date.split('').splice(3, 8).join('') ===
        props.date.toLocaleDateString().split('').splice(3, 8).join('')
    )
    .sort(
      (a, b) =>
        new Date(a.date.split('.').reverse().join('-')) -
        new Date(b.date.split('.').reverse().join('-'))
    );

  return (
    <AllTaskStyle>
      <h5>All task of this mounth:</h5>
      {tasksOfThisMounth.length === 0 ? (
        <p>There are no tasks for this mounth.</p>
      ) : (
        <TasksList tasksList={tasksOfThisMounth} />
      )}
    </AllTaskStyle>
  );
};

export default AllTaskOfMonth;
