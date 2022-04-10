import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { apiError } from '../store/selectors/globalAppState';
import { toast, ToastContainer } from 'react-toastify';
export const ToastContext = React.createContext('');

const StyledToastWrapper = styled.div``;

const GlobalToastProvider = (props) => {
  const APIerror = useSelector(apiError);

  const [error, setError] = useState();
  const addError = (error) => setError(error);

  useEffect(() => {
    if (APIerror) {
      toast.error(APIerror);
    } else if (error) {
      toast.error(APIerror);
    }
  }, [APIerror, error]);

  return (
    <ToastContext.Provider value={addError}>
      {props.children}
      <StyledToastWrapper>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StyledToastWrapper>
    </ToastContext.Provider>
  );
};
export default GlobalToastProvider;
