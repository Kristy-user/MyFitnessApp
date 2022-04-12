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
    background-color: gray;
    border: 1px solid ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;
const FormikRadio = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <RadioInputStyle>
      <div>
        <input
          name={props.name}
          id={props.value}
          type="radio"
          value={props.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          checked={props.cheked === props.value}
        />

        <label htmlFor={props.value}>{props.label} ml</label>
      </div>
    </RadioInputStyle>
  );
};

export default FormikRadio;
