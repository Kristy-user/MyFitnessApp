import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { globalErrors } from '../store/selectors/globalAppState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = React.createContext('');

const StyledToastWrapper = styled.div``;

const GlobalToastProvider = (props) => {
  const allGlobalerrors = useSelector(globalErrors);

  const [error, setError] = useState();
  const addError = (error) => setError(error);

  useEffect(() => {
    if (allGlobalerrors.apiError) {
      toast.error(allGlobalerrors.apiError);
    } else if (error) {
      toast.error(error);
    }
  }, [allGlobalerrors, error]);

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
