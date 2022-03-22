import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import TasksList from '../../Layouts/Components/Tasks/TasksList';
import { taskListSelector } from '../../store/selectors/tasksList';
import { userIdSelector } from '../../store/selectors/user';

const NewTaskStyle = styled.div`
  display: flex;
  flex-direction: column;
  .newTask,
  .currentTask {
    text-align: center;
    padding: 20px;
    width: 100%;
  }

  h4 {
    text-transform: uppercase;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    color: ${(props) => props.theme.fontColor};
    span {
      text-shadow: 0px 0px 3px ${(props) => props.theme.buttonColor};
      padding: 4px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.cardBackGroundColor};
      color: ${(props) => props.theme.headerBackGroundColor};
    }
  }
  .button_add,
  .cancel {
    text-align: right;
    ${ButtonStyle};
    font-size: 18px;
    margin: 10px;
    align-items: flex-end;
  }
  .inputNewTask {
    width: 90%;
    align-items: center;
    font-size: 18px;
    border: 3px solid ${(props) => props.theme.cardBackgroundColor};
    margin: 5px;
    padding: 10px;

    border: 0.5px solid ${(props) => props.theme.buttonColor};
    &:focus {
      border: 2px inset ${(props) => props.theme.headerBackgroundColor};
      box-shadow: 0px 0px 3px 0px ${(props) => props.theme.appBackGroundColor};
    }
  }
`;

const NewTaskAdd = (props) => {
  const [task, setTask] = useState('');
  const tasksList = useSelector(taskListSelector);
  return (
    <NewTaskStyle>
      <div className="currentTask">
        {tasksList.filter((task) => task.date === props.datePicked).length >
        0 ? (
          <>
            <h4>
              Your task for <span>{props.datePicked}</span>
            </h4>
            <TasksList
              tasksList={tasksList.filter(
                (task) => task.date === props.datePicked
              )}
            />
          </>
        ) : (
          <h4>
            No tasks for <span>{props.datePicked}</span>
          </h4>
        )}
      </div>
      <div className={'newTask'}>
        <h4>
          Add a task for <span>{props.datePicked}</span>
        </h4>
        <input
          className={'inputNewTask'}
          placeholder="...place for a new task"
          type="text"
          value={task}
          onChange={(evt) => setTask(evt.target.value)}
        />
        <button
          className={'button_add'}
          onClick={() => {
            props.addNewTask(task, props.datePicked);
            setTask('');
          }}
        >
          Add
        </button>
        <div>
          <button
            className={'cancel'}
            onClick={() => {
              props.setModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </NewTaskStyle>
  );
};

export default NewTaskAdd;
