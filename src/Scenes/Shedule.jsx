import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { CardStyle } from '../Components/CardTemplate';
import fakeServerAPI from '../api/fakeServerAPI';
import DayTasks from '../Layouts/MainLayout/DayTasks';
import { taskListSelector } from '../store/selectors/tasksList';
import { personalDataisEdit } from '../store/selectors/userPersonalData';
import { ModalContext } from '../HOC/GlobalModalProvider';
import NewTaskAdd from '../HOC/ModalContent/NewTaskAdd';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTaskList, newTask } from '../store/actions/tasks';
import { userIdSelector } from '../store/selectors/user';
import { HeaderTittle } from '../Components/HeaderTittle';

const StyledCalendar = styled.div`
  font-style: u;
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
  .react-calendar__navigation button {
    color: ${(props) => props.theme.fontColor};

    width: 44px;
    height: 100%;
    border-radius: 6px 6px 0 0;
    background-color: '#fff';
    font-size: 20px;
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
    /* background-color: ${(props) => props.theme.cardBackGroundColor}; */
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
    color: ${(props) => props.theme.headerBackGroundColor};
    background: none;
    box-shadow: 0px 0px 6px gray;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

export const Shedule = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const openModal = useContext(ModalContext);
  const userId = useSelector(userIdSelector);

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

  return (
    <StyledCalendar>
      <h3>Choose the day to set a task or an exercise.</h3>
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={(date) => openModalTask(date)}
      />
    </StyledCalendar>
  );
};
