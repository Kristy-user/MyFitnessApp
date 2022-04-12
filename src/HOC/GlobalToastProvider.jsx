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

  useEffect(() => {
    if (allGlobalerrors.length > 0) {
      setError(allGlobalerrors[allGlobalerrors.length - 1].text);
    }
  }, [allGlobalerrors]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError('');
    }
  }, [error, allGlobalerrors]);

  return (
    <ToastContext.Provider value={setError}>
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
