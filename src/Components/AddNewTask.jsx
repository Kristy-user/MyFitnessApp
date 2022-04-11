import { useField } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { newTask } from '../store/actions/tasks';
import { ButtonStyle } from './Button';

const AddTaskStyle = styled.div`
  margin: 20px auto;
  width: 100%;
  align-items: center;
  align-self: center;
  text-align: center;

  & button {
    ${ButtonStyle}
  }
  & input {
    font-size: 18px;
    border: 3px solid ${(props) => props.theme.cardBackGroundColor};
    align-self: center;
    padding: 10px;
    width: 95vh;
    &:focus {
      border: 2px solid ${(props) => props.theme.buttonColor};
      box-shadow: 0px 0px 3px 0px ${(props) => props.theme.buttonColor};
    }
  }
  .error {
    text-shadow: 1px 1px 4px #f50f0f;
    color: #4d1515;
    text-align: center;
    padding: 5px;
  }
  .error_input {
    border: 1px solid red;
  }
`;

const AddNewTask = ({ userId, date }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [touched, setTouched] = useState(false);
  function addNewTask() {
    if (!title) {
      setTouched(true);
    } else {
      dispatch(newTask({ date, title }, userId));
      setTitle('');
    }
  }
  return (
    <AddTaskStyle>
      <input
        className={touched ? 'error_input' : ''}
        placeholder="...place for a new task"
        type="text"
        value={title}
        onChange={(evt) => {
          setTouched(false);
          setTitle(evt.target.value);
        }}
      />
      {touched ? <div className={'error'}>Required</div> : null}
      <button onClick={() => addNewTask()}>+</button>
    </AddTaskStyle>
  );
};

export default AddNewTask;
