import React, { useState } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  position: relative;
  input {
    background-color: #bbb9b9;
    border-radius: 8px;
    color: #020202;
    display: block;
    width: 100%;
    margin: 5px auto;
    padding: 10px;
    font-size: 24px;

    &:focus {
      border: none;
      background-color: #ffffff;
      box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
        rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
        rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }
    &::placeholder {
      color: #525257;
      font-size: 16px;
    }
  }

  .passwordInput {
    position: relative;
    display: block;
    margin: 5px auto;
  }
  .icon {
    position: absolute;
    top: 14px;
    left: 90%;
    &:before {
      font-family: 'Font Awesome 5 Free';
      padding-right: 10px;
    }
    &.eye:before {
      content: '\f06e';
    }
    &.eye_slash:before {
      content: '\f070';
    }
    &:hover {
      cursor: pointer;
    }
  }
  .error {
    text-shadow: 1px 1px 4px #f50f0f;
    color: #4d1515;
    text-align: center;
  }
  .errorInput,
  .errorInput:focus {
    border: 2px solid #eb1b1baf;
    &:focus {
      box-shadow: none;
    }
  }
`;

const FormikInput = (props) => {
  const [passwordView, setPasswordView] = useState('password');
  const [field, meta, helpers] = useField(props);
  let className = [];

  if (meta.error && meta.touched) {
    className.push('errorInput');
  }
  if (props.name === 'password' || props.name === 'confirmPassword') {
    className.push('passwordInput');
  }
  const handlerView = () =>
    passwordView === 'password'
      ? setPasswordView('text')
      : setPasswordView('password');

  return (
    <StyledInputWrapper>
      <input
        className={className.join(' ')}
        placeholder={
          props.name === 'name' || props.name === 'surname'
            ? ''
            : props.name.replace(/([A-Z])/g, ' $1').toUpperCase()
        }
        name={props.name}
        type={
          props.name === 'password' || props.name === 'confirmPassword'
            ? passwordView
            : 'text'
        }
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
      {props.name === 'password' || props.name === 'confirmPassword' ? (
        <div
          className={
            passwordView === 'password' ? 'icon eye_slash' : 'icon eye'
          }
          onClick={() => handlerView()}
        ></div>
      ) : null}

      {meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>
      ) : null}
    </StyledInputWrapper>
  );
};

export default FormikInput;
