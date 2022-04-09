import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { ModalContext } from 'HOC/GlobalModalProvider';
import NewTaskAdd from 'HOC/ModalContent/NewTaskAdd';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from 'store/selectors/user';
import { HeaderTittle } from 'Components/HeaderTittle';
import { newTask } from 'store/actions/tasks';
import AllTaskOfMonth from './AllTaskOfMonth';
import { currentTaskListSelector } from '../../store/selectors/tasksList';

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    ${HeaderTittle}
  }
  .react-calendar {
    margin: 0 auto;
    width: 80%;
    max-width: 100%;
    border-radius: 6px;

    color: ${(props) => props.theme.calendarTittle};
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  .react-calendar__viewContainer {
    padding: 0 10px 20px 10px;
  }
  .react-calendar__navigation {
    padding-top: 20px;
    & button {
      color: ${(props) => props.theme.fontColor};
      width: 44px;
      height: 100%;
      border-radius: 6px 6px 0 0;
      background-color: '#fff';
      font-size: 20px;
    }
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    color: ${(props) => props.theme.buttonColor};
    background-color: inherit;
  }
  .react-calendar__navigation button[disabled] {
    background-color: ${(props) => props.theme.fontColor};
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    color: ${(props) => props.theme.fontColor};
    border-radius: 6px;
    font-size: 18px;
    border: 1px inset ${(props) => props.theme.buttonColor};
  }
  .react-calendar__tile--now {
    background: #fff;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 600;
    box-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttonColor};
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${(props) => props.theme.buttonColor};
    border-radius: 6px;
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.fontColor};
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${(props) => props.theme.cardBackGroundColor};
  }
  .react-calendar__tile--active {
    border-radius: 6px;
    font-weight: bold;
    font-size: 18px;
    color: ${(props) => props.theme.fontColor};
    background: none;
    box-shadow: 0px 0px 6px gray;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
  .react-calendar__month-view__days__day {
    margin: 3px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: inherit;
  }
  .mark {
    background-color: #cfd3d3;
    color: black;
    font-weight: bold;
    border-radius: 6px;
    box-shadow: 0px 0px 4px ${(props) => props.theme.buttonColor};
  }
`;

export const Shedule = () => {
  const [date, setDate] = useState(new Date());
  const [dateView, setDateView] = useState(new Date());
  const dispatch = useDispatch();
  const openModal = useContext(ModalContext);
  const userId = useSelector(userIdSelector);
  const taskList = useSelector(currentTaskListSelector);
  const addNewTask = (task, date) => {
    let newUserTask = {};
    newUserTask.date = date;
    newUserTask.title = task;
    dispatch(newTask(newUserTask, userId));
  };
  const openModalTask = (date) => {
    openModal(
      <NewTaskAdd
        datePicked={date.toLocaleDateString()}
        setModal={openModal}
        addNewTask={addNewTask}
      />
    );
  };
  const setMarkView = (date, view) =>
    taskList.map((task) =>
      task.date == date.toLocaleDateString() && view === 'month' ? 'mark' : null
    );

  return (
    <StyledCalendar>
      <h3>Choose the day to set a task or an exercise.</h3>
      <Calendar
        locale={'en'}
        onChange={setDate}
        value={date}
        onClickDay={(date) => openModalTask(date)}
        tileClassName={({ date, view }) => setMarkView(date, view)}
        onActiveStartDateChange={({ activeStartDate }) =>
          setDateView(activeStartDate)
        }
      />
      <AllTaskOfMonth date={dateView} />
    </StyledCalendar>
  );
};
