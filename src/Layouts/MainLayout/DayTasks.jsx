import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTaskList } from 'store/actions/tasks';
import TasksList from '../Components/Tasks/TasksList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fakeServerAPI from '../../api/fakeServerAPI';
import { newTask } from '../../store/actions/tasks';
import { ButtonStyle } from '../../Components/Button';
import { taskListSelector } from '../../store/selectors/tasksList';
import { currentUserPersonalData } from '../../store/selectors/userPersonalData';
import { HeaderTittle } from '../../Components/HeaderTittle';
import { userIdSelector } from '../../store/selectors/user';
import GoalsManagement from '../Components/GoalsManagement';
import DataAnalyticsToday from '../Components/Analytics/DataAnalyticsToday';
import { currentGoalsSelector } from '../../store/selectors/goals';
import { loadingUserPersonalData } from '../../store/actions/userPersonalData';
import { loadingUserGoals } from '../../store/actions/goals';
import PromptWindow from '../../HOC/ModalContent/PromptWindow';
import { ModalContext } from '../../HOC/GlobalModalProvider';

const CardTaskStyle = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  h3 {
    ${HeaderTittle}
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .date_title {
    margin: 0;
    padding: 0;
  }
  .react-datepicker-wrapper {
    width: max-content;
    div {
      width: max-content;
    }
    input {
      max-width: 130px;
    }
  }
  .date_picker {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    border: none;
    font-size: 22px;
    text-align: center;
    width: min-content;
    box-shadow: 0px 0px 6px #e6e6e6;
    margin: 10px;
    padding: 5px;
    display: inline-block;
    background-color: gray;
    color: ${(props) => props.theme.fontColor};
    border-radius: 6px;
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
    }
    & input {
      font-size: 18px;
      border: 3px solid ${(props) => props.theme.cardBackGroundColor};
      margin: 5px;
      padding: 10px;
      width: 100%;
      &:focus {
        border: 2px solid ${(props) => props.theme.buttonColor};
        box-shadow: 0px 0px 3px 0px ${(props) => props.theme.buttonColor};
      }
    }
  }
`;

const DayTasks = () => {
  const [startDate, setStartDate] = useState(new Date());
  const tasksList = useSelector(taskListSelector);
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const openModal = useContext(ModalContext);
  const currentGoals = useSelector(currentGoalsSelector);
  const currentUser = useSelector(currentUserPersonalData);

  useEffect(() => {
    fakeServerAPI.get(`/userPersonalData?userId=${userId}`).then((response) => {
      if (response.data) {
        dispatch(loadingUserPersonalData(response.data));
      }
    });
  }, []);

  useEffect(() => {
    fakeServerAPI.get(`/tasks?userId=${userId}`).then((response) => {
      if (response.data) {
        dispatch(loadingTaskList(response.data));
      }
    });
  }, []);

  useEffect(() => {
    fakeServerAPI.get(`/dataGoals?userId=${userId}`).then((response) => {
      if (response.data) {
        dispatch(loadingUserGoals(response.data));
      }
    });
  }, []);

  if (!currentGoals) {
    openModal(<PromptWindow setModal={openModal} link={'goals'} />);
    return <CardTaskStyle></CardTaskStyle>;
  }
  if (!currentUser) {
    openModal(<PromptWindow setModal={openModal} link={'personalData'} />);
    return <CardTaskStyle></CardTaskStyle>;
  } else {
    openModal(false);
    return (
      <React.Fragment>
        <CardTaskStyle>
          <div className={'title'}>
            <div className={'date_title'}>
              <h3>Upcoming tasks for</h3>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              className={'date_picker'}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          {tasksList.filter(
            (task) => task.date === startDate.toLocaleDateString()
          ).length === 0 ? (
            <p>There are no tasks for today.</p>
          ) : (
            <TasksList
              tasksList={tasksList.filter(
                (task) => task.date === startDate.toLocaleDateString()
              )}
            />
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
                let newUserTask = {};
                newUserTask.date = startDate.toLocaleDateString();
                newUserTask.title = task;
                dispatch(newTask(newUserTask, userId));
                setTask('');
              }}
            >
              +
            </button>
          </div>
        </CardTaskStyle>
        <DataAnalyticsToday />
        <GoalsManagement />
      </React.Fragment>
    );
  }
};

export default DayTasks;
