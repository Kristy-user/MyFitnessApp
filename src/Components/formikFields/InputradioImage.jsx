import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';

const RadioImageStyle = styled.div`
  .avatar {
    max-width: 250px;
    max-height: 250px;
    border-radius: 50%;
  }
  .input-hidden {
    position: absolute;
    left: -9999px;
  }
  input[type='radio'] {
    display: none;
  }
  input[type='radio']:checked + label > img,
  input[type='radio']:hover + label > img {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    border: 2px solid ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const InputRadioImage = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <RadioImageStyle>
      <input
        name={props.name}
        id={props.value}
        type="radio"
        value={props.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        checked={props.cheked === props.value}
      />
      <label htmlFor={props.value}>
        <img className="avatar" src={props.value} alt="avatar_image" />
      </label>
    </RadioImageStyle>
  );
};

export default InputRadioImage;
