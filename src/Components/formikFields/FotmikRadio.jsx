import { useField } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

const RadioInputStyle = styled.div`
  input[type='radio'] {
    display: none;
  }

  label {
    display: inline-block;
    background-color: ${(props) => props.theme.cardBackgroundColor};
    color: ${(props) => props.theme.fontColor};
    padding: 4px 6px;
    margin: 5px;
    border-radius: 10px;
    height: fit-content;
    max-width: 90px;
    box-shadow: 0px 0px 6px ${(props) => props.theme.fontColor};
    font-size: 22px;
  }

  input[type='radio']:checked + label,
  input[type='radio']:hover + label {
    background-color: ${(props) => props.theme.buttonColor};
    border: 1px solid #60adf0;
    color: inherit;
  }
`;
const FormikRadio = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <RadioInputStyle>
      <input
        name={props.name}
        id={props.value}
        type="radio"
        value={props.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />

      <label htmlFor={props.value}>{props.label}</label>
    </RadioInputStyle>
  );
};

export default FormikRadio;
