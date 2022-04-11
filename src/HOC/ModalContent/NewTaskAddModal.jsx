import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNewTask from '../../Components/AddNewTask';
import { ButtonStyle } from '../../Components/Button';
import { CardStyle } from '../../Components/CardTemplate';
import TasksList from 'Scenes/Components/Tasks/TasksList';
import { taskListSelector } from '../../store/selectors/tasksList';

const NewTaskStyle = styled.div`
  ${CardStyle}
  background-color: ${(props) => props.theme.unmarckColor};
  color: black;
  font-size: 18px;
  display: flex;
  flex-direction: column;

  .newTask,
  .currentTask {
    text-align: center;
    padding: 20px;
    width: 100vh;
  }

  h4 {
    text-transform: uppercase;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    color: ${(props) => props.theme.shadowColor};
    span {
      padding: 4px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.appBackGroundColor};
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

const NewTaskAddModal = (props) => {
  const tasksList = useSelector(taskListSelector);

  return (
    <NewTaskStyle>
      <div className="currentTask">
        {tasksList.filter((task) => task.date === props.date).length > 0 ? (
          <>
            <h4>
              Your task for <span>{props.date}</span>
            </h4>
            <TasksList
              tasksList={tasksList.filter((task) => task.date === props.date)}
            />
          </>
        ) : (
          <h4>
            No tasks for <span>{props.date}</span>
          </h4>
        )}
      </div>
      <div className={'newTask'}>
        <h4>
          Add a task for <span>{props.date}</span>
        </h4>
        <AddNewTask userId={props.userId} date={props.date} />
        <button
          className={'cancel'}
          onClick={() => {
            props.setModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </NewTaskStyle>
  );
};

export default NewTaskAddModal;
