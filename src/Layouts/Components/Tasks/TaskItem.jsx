import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { ButtonStyle } from '../../../Components/Button';
import {
  
  removeTask,
  setComplitedTask,
} from '../../../store/actions/tasks';

const ListStyle = styled.div`
  li {
    padding: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    width: 90vh;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 6px;
  }

  .delete {
    ${ButtonStyle}
    text-align:right;
    font-size: 18px;
    border-radius: 50%;
    line-height: 0.4;
  }
  label {
  }
  input[type='checkbox'] {
    align-self: center;
    margin-right: 13px;
    position: relative;
    width: 1.5em;
    height: 1.5em;
    color: ${(props) => props.theme.buttonColor};
    border: 1px inset ${(props) => props.theme.buttonColor};
    border-radius: 4px;
    appearance: none;
    top: 3px;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: '';
      display: block;
      top: -1px;
      left: 6px;
      width: 8px;
      height: 16px;
      border-style: solid;
      border-color: white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      box-shadow: 1px 1px 1px 0 white;
      color: white;
      border-color: ${(props) => props.theme.buttonColor};
      background: ${(props) => props.theme.fontColor};
      &::before {
        opacity: 1;
      }
    }
  }
  .done {
    text-decoration: line-through;
  }
`;

const TaskItem = ({ task, index }) => {
  const dispatch = useDispatch();
  const classes = ['checkbox_item'];
  if (task.completed) {
    classes.push('done');
  }

  return (
    <ListStyle>
      <li>
        <div className={classes.join(' ')}>
          <input
            checked={task.completed}
            type="checkbox"
            id={task.id}
            onChange={() => dispatch(setComplitedTask(task))}
          />
          <label htmlFor={task.id} data-content={task.title}>
            {task.title} &emsp;
            {task.date}
          </label>
        </div>
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
