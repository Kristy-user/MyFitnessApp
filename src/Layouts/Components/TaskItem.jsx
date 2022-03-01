import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import { completeTask, removeTask } from '../../store/actions/tasks';

const ListStyle = styled.div`
  li {
    box-shadow: 0px 0px 6px #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid ${(props) => props.theme.appBackGroundColor};
  }

  .taskText {
    display: inline;
    padding-right: 25px;
  }

  /* .inputItem {
    margin-right: 1rem;
  } */
  .delete {
    ${ButtonStyle}
    font-size: 20px;
    background: ${(props) => props.theme.cardBackgroundColor};
    border-radius: 50%;
    line-height: 0.5;
  }
  .done {
    text-decoration: line-through;
  }
`;

const TaskItem = ({ task, index }) => {
  const dispatch = useDispatch();
  const classes = [];
  if (task.completed) {
    classes.push('done');
  }
  return (
    <ListStyle>
      <li>
        <span className={classes.join(' ')}>
          <input
            checked={task.completed}
            className={'inputItem'}
            type="checkbox"
            id={task.id}
            onChange={() => dispatch(completeTask(task.id))}
          />
          <label for={task.id}></label>
          <strong>{index + 1}.</strong>
          &nbsp;
          <p className={'taskText'}>{task.title}</p>
        </span>
        <button
          className={'delete'}
          onClick={() => dispatch(removeTask(task.id))}
        >
          x
        </button>
      </li>
    </ListStyle>
  );
};

export default TaskItem;
