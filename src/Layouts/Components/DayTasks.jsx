import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { taskListSelector } from 'store/selectors/tasksList';
import { loadingTaskList } from 'store/actions/tasks';
import TasksList from './TasksList';
import { CardStyle } from '../../Components/CardTemplate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fakeServerAPI from '../../api/fakeServerAPI';
import { newTask } from '../../store/actions/tasks';
import { ButtonStyle } from '../../Components/Button';
import { taskEditSelector } from '../../store/selectors/tasksList';
import { StyledLoader } from '../../Components/Loader';

const CardTaskStyle = styled.div`
  ${CardStyle}
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};

  .date_picker {
    border: none;
    font-size: 22px;
    text-align: center;
    width: 130px;
    box-shadow: 0 3px 6px 0 ${(props) => props.theme.fontColor};
    margin: 10px;
    padding: 5px;
    /* border-radius: 8px; */
    background-color: ${(props) => props.theme.cardBackgroundColor};
    /* color: ${(props) => props.theme.fontColor}; */
    &:focus {
      outline: none;
    }
  }
  .newTask {
    align-items: center;
    align-self: center;
    text-align: center;
    display: flex;
    & button {
      ${ButtonStyle}
      background: none;
      background-color: ${(props) => props.theme.cardBackgroundColor};
    }
    & input {
      border: 3px solid ${(props) => props.theme.cardBackgroundColor};
      margin: 5px;
      padding: 10px;
      width: 100vh;
      outline: none;
      &:focus {
        outline: none;
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
    return () => {
      if (isEditedTasks) {
        fakeServerAPI.put('/tasks', tasksList);
      }
    };
  }, []);

  return (
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
                id: Date.now(),
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
  );
};

export default DayTasks;
