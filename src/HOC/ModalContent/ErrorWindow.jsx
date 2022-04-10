import React from 'react';

const ErrorWindow = (props) => {
  return (
    <div>
      {props.error}
      <button onClick={() => props.setModal(false)}>Close</button>
    </div>
  );
};

export default ErrorWindow;
