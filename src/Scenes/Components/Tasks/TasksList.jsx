import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TaskItem from './TaskItem';

const TasksList = (props) => {
  return (
    <ul>
      {props.tasksList.map((task, index) => (
        <TaskItem task={task} key={task.id} index={index} />
      ))}
    </ul>
  );
};

export default TasksList;
