import React, { useState } from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInputNumberWrapper = styled.div`
  .error {
    text-shadow: 1px 1px 4px #f50f0f;
    color: #4d1515;
    text-align: center;
  }
`;
const FormikInputNumber = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <StyledInputNumberWrapper>
      <input
        className={props.className}
        name={props.name}
        type="text"
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}
      />

      {meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>
      ) : null}
    </StyledInputNumberWrapper>
  );
};

export default FormikInputNumber;
