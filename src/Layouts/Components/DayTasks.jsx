import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTaskList } from 'store/actions/tasks';
import TasksList from './TasksList';
import { CardStyle } from '../../Components/CardTemplate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fakeServerAPI from '../../api/fakeServerAPI';
import { newTask } from '../../store/actions/tasks';
import { ButtonStyle } from '../../Components/Button';
import { StyledLoader } from '../../Components/Loader';
import {
  taskEditSelector,
  taskListSelector,
} from '../../store/selectors/tasksList';
import WaterBalance from './WaterBalance';

const CardTaskStyle = styled.div`
  ${CardStyle}
  font-size: 18px;
  background-color: #ffffff71;
  .date_picker {
    border: none;
    font-size: 22px;
    text-align: center;
    width: 130px;

    box-shadow: 0px 0px 6px #e6e6e6;
    margin: 10px;
    padding: 5px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.cardBackgroundColor};
    color: ${(props) => props.theme.headerBackgroundColor};
    &:focus {
      outline: none;
    }
  }
  .newTask {
    margin: 20px auto;
    width: 100%;
    align-items: center;
    align-self: center;
    text-align: center;
    display: flex;
    & button {
      ${ButtonStyle}
      color:${(props) => props.theme.fontColor};
      background-color: ${(props) => props.theme.cardBackgroundColor};
    }
    & input {
      font-size: 18px;
      border: 3px solid ${(props) => props.theme.cardBackgroundColor};
      margin: 5px;
      padding: 10px;
      width: 100%;
      &:focus {
        border: 2px solid #361212a4;
        box-shadow: 0px 0px 3px 0px ${(props) => props.theme.fontColor};
      }
    }
  }
  h3 {
    padding: 10px;
  }
`;
const StyledLoadingWrapper = styled.div`
  ${StyledLoader}
`;
const DayTasks = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState('');

  const isEditedTasks = useSelector(taskEditSelector);
  const tasksList = useSelector(taskListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    fakeServerAPI.get('/tasks').then((response) => {
      dispatch(loadingTaskList(response.data));
    });
  }, []);

  const idTask =
    tasksList.length > 0 ? tasksList[tasksList.length - 1].id + 1 : 1;

  return (
    <React.Fragment>
      <CardTaskStyle>
        <h3>
          Upcoming tasks for
          <DatePicker
            dateFormat="dd/MM/yyyy"
            className={'date_picker'}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </h3>
        {!tasksList ? (
          <StyledLoadingWrapper>
            <div></div>
            <div></div>
            <div></div>
          </StyledLoadingWrapper>
        ) : (
          <TasksList tasksList={tasksList} />
        )}
        <div className={'newTask'}>
          <input
            placeholder="...place for a new task"
            type="text"
            value={task}
            onChange={(evt) => setTask(evt.target.value)}
          />
          <button
            onClick={() => {
              dispatch(
                newTask({
                  title: task,
                  id: idTask,
                  completed: false,
                })
              );
              setTask('');
            }}
          >
            +
          </button>
        </div>
      </CardTaskStyle>
      <WaterBalance />
    </React.Fragment>
  );
};

export default DayTasks;
