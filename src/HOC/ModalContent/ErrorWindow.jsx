import React from 'react';

const ErrorWindow = (props) => {
  console.log(props.error);
  return (
    <div>
      {props.error}
      <button onClick={() => props.setModal(false)}>Close</button>
    </div>
  );
};

export default ErrorWindow;
