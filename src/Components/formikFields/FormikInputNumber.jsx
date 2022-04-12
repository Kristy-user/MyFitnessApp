import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInputNumberWrapper = styled.div`
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
const FormikInputNumber = (props) => {
  const [field, meta, helpers] = useField(props);
  let className = [props.className];

  meta.error && meta.touched ? className.push('errorInput') : className;

  return (
    <StyledInputNumberWrapper>
      <input
        className={className.join(' ')}
        name={props.name}
        type="text"
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
      {meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>
      ) : null}
    </StyledInputNumberWrapper>
  );
};

export default FormikInputNumber;
