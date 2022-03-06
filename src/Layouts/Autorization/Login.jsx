import React from 'react';

import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/actions/user';
import fakeServerAPI from '../../api/fakeServerAPI';
import { userLoginSelector } from '../../store/selectors/user';
import { useNavigate } from 'react-router-dom';

import FormikInput from '../../Components/formikFields/FormikInput';
import { ButtonStyle } from '../../Components/Button';

const StyledLoginHolder = styled.div`
  max-width: 35rem;
  height: 25rem;
  text-align: center;
  padding: 20px;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;
  background-color: rgba(77, 74, 74, 0.7);

  .welcome {
    font-size: 32px;
    font-weight: 400;
    color: #d6d5d5;
    text-shadow: 0px 0px 6px rgba(8, 8, 8, 1);
  }
  .buttonSubmit {
    ${ButtonStyle}
    margin-top: 30px;
    color: black;

    &:hover {
      background-color: #44e64497;
    }
  }

  @media (max-width: 986px) {
    min-height: 25rem;
  }
`;

const Login = (props) => {
  const dispatch = useDispatch();
  const navig = useNavigate();
  const isLogin = useSelector(userLoginSelector);

  const validate = (values) => {
    const errors = {};
    let isError = false;
    const correctPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!values.email) {
      errors.email = 'Required';
      isError = true;
    } else if (
      !values.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.email = 'Invalid email address';
      isError = true;
    }
    if (!values.password.match(correctPassword)) {
      errors.password =
        'Password must contain at least one number,one uppercase and lowercase letter, and at least 6 or more characters';
      isError = true;
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password does not match';
      isError = true;
    }
    if (isError) return errors;
  };

  const getLoginCard = () => {
    return (
      <StyledLoginHolder>
        <div className="welcome">
          <p>Login to continue.</p>
        </div>
        <div className={'loginCard'}>
          <div className={'cardBody'}>
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validate={validate}
              onSubmit={(formValues) => {
                fakeServerAPI
                  .post('/login', {
                    email: formValues.email,
                    password: formValues.password,
                  })
                  .then((response) => {
                    console.log(response.data.user.id);
                    dispatch(
                      logIn({
                        userName: 'email',
                        userRoles: ['regularUser'],
                        isLoggedIn: response.data.accessToken,
                        id: response.data.user.id,
                      })
                    );
                    navig('/home');
                  });
              }}
            >
              <Form>
                <FormikInput name="email" />
                <FormikInput name="password" />
                <button className="buttonSubmit">Login</button>
              </Form>
            </Formik>
          </div>
        </div>
      </StyledLoginHolder>
    );
  };

  const getRegisterCard = () => {
    return (
      <StyledLoginHolder>
        <div className="welcome">
          <p>Welcome! </p>
          <p>Register to start.</p>
        </div>

        <div className={'loginCard'}>
          <div className={'cardBody'}>
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validate={validate}
              onSubmit={(formValues) => {
                fakeServerAPI
                  .post('/register', {
                    email: formValues.email,
                    password: formValues.password,
                  })
                  .then((response) => {
                    dispatch(
                      logIn({
                        userName: 'email',
                        userRoles: ['regularUser'],
                        isLoggedIn: response.data.accessToken,
                        id: response.data.user.id,
                      })
                    );
                    navig('/home');
                  });
              }}
            >
              <Form>
                <FormikInput name="email" />
                <FormikInput name="password" />
                <FormikInput name="confirmPassword" />
                <button className="buttonSubmit">Register now</button>
              </Form>
            </Formik>
          </div>
        </div>
      </StyledLoginHolder>
    );
  };

  if (isLogin) {
    return getLoginCard();
  } else {
    return getRegisterCard();
  }
};
export default Login;
//
