import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTaskList } from 'store/actions/tasks';
import TasksList from 'Scenes/Components/Tasks/TasksList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fakeServerAPI from '../../api/fakeServerAPI';
import { taskListSelector } from '../../store/selectors/tasksList';
import { currentUserPersonalData } from '../../store/selectors/userPersonalData';
import { HeaderTittle } from '../../Components/HeaderTittle';
import { userIdSelector } from '../../store/selectors/user';
import { currentGoalsSelector } from '../../store/selectors/goals';
import { loadingUserGoals } from '../../store/actions/goals';
import PromptWindow from 'Scenes/Components/DayTasks/PromptWindow';
import DataAnalyticsToday from 'Scenes/Components/DayTasks/DataAnalyticsToday';
import GoalsManagement from 'Scenes/Components/DayTasks/GoalsManagement';
import AddNewTask from '../../Components/AddNewTask';

const CardTaskStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
    border: none;
    font-size: 22px;
    text-align: center;
    width: min-content;
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
    margin: 10px;
    padding: 5px;
    display: inline-block;
    background-color: ${(props) => props.theme.unmarckColor};
    color: ${(props) => props.theme.fontColor};
    border-radius: 6px;
    &:focus {
      outline: none;
    }
  }
  .react-datepicker__day:hover {
    background-color: ${(props) => props.theme.cardBackGroundColor};
    color: ${(props) => props.theme.headerBackGroundColor};
  }
  .react-datepicker__day--keyboard-selected {
    border-radius: 0.3rem;
    background-color: #fff;
    color: inherit;
  }
  .react-datepicker__day--selected {
    color: ${(props) => props.theme.headerBackGroundColor};
    background-color: ${(props) => props.theme.buttonColor};
    & :hover {
      color: ${(props) => props.theme.buttonColor};
      background-color: ${(props) => props.theme.cardBackGroundColor};
    }
  }
`;

const DayTasks = () => {
  const [startDate, setStartDate] = useState(new Date());
  const tasksList = useSelector(taskListSelector);

  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const currentGoals = useSelector(currentGoalsSelector);
  const currentUser = useSelector(currentUserPersonalData);

  useEffect(() => {
    fakeServerAPI
      .get(`/dataGoals?userId=${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserGoals(response.data));
        }
      })
      .catch((error) => error);
    fakeServerAPI
      .get(`/tasks?userId=${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingTaskList(response.data));
        }
      })
      .catch((error) => error);
  }, []);

  if (!currentUser) {
    return (
      <CardTaskStyle>
        <PromptWindow link={'personalData'} />
      </CardTaskStyle>
    );
  } else if (currentGoals.length === 0) {
    return (
      <CardTaskStyle>
        <PromptWindow link={'goals'} />
      </CardTaskStyle>
    );
  } else
    return (
      <React.Fragment>
        <CardTaskStyle>
          <div className={'title'}>
            <div className={'date_title'}>
              <h3>Upcoming tasks for</h3>
            </div>
            <DatePicker
              popperPlacement="left-start"
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
          <AddNewTask userId={userId} date={startDate.toLocaleDateString()} />
        </CardTaskStyle>
        <DataAnalyticsToday date={startDate} />
        <GoalsManagement date={startDate} />
      </React.Fragment>
    );
};

export default DayTasks;
