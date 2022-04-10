import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/actions/user';
import fakeServerAPI from '../../api/fakeServerAPI';
import { userLoginSelector } from '../../store/selectors/user';
import { useNavigate } from 'react-router-dom';
import FormikInput from '../../Components/formikFields/FormikInput';
import { ButtonStyle } from '../../Components/Button';
import { showEditGoalsCard } from '../../store/actions/goals';
import { apiError } from '../../store/selectors/globalAppState';


const StyledLoginHolder = styled.div`
  max-width: 35rem;
  height: 25rem;
  text-align: center;
  padding: 20px;
  padding-bottom: 5px;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;
  background-color: rgba(77, 74, 74, 0.7);
  .footer_auth_card {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 0;
    justify-content: center;
    color: black;
    & p {
      margin: 0 10px;
      align-self: center;
    }
  }
  .welcome {
    font-size: 32px;
    font-weight: 400;
    color: #d6d5d5;
    text-shadow: 0px 0px 6px rgba(8, 8, 8, 1);
  }
  .buttonSubmit {
    ${ButtonStyle}
    background-color: rgba(180, 182, 181, 0.7);
    margin-top: 30px;
    &:hover {
      color: ${(props) => props.theme.appBackGroundColor};
      text-shadow: none;
      background-color: ${(props) => props.theme.fontColor};
    }
  }
  .button {
    text-decoration: underline;
    background: none;
    font-size: 16px;
    /* color: inherit; */
    padding: 3px;
    border: none;
    border-radius: 6px;
    &:hover {
      color: ${(props) => props.theme.headerBackGroundColor};
    }
  }
  @media (max-width: 986px) {
    min-height: 25rem;
  }
  .error {
    color: ${(props) => props.theme.headerBackGroundColor};
    font-size: 16px;
    text-shadow: 0px 0px 6px rgba(235, 23, 23, 0.7);
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navig = useNavigate();
  const isLogin = useSelector(userLoginSelector);
  const [cardVie, setCardVie] = useState(isLogin);
  

  const validate = (values) => {
    const errors = {};
    let isError = false;
    const correctPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const correctEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        errors[key] = 'Required';
        isError = true;
      } else if (!values.email.match(correctEmail)) {
        errors.email = 'Invalid email address';
        isError = true;
      } else if (!values.password.match(correctPassword)) {
        errors.password =
          'Password must contain at least one number,one uppercase and lowercase letter, and at least 6 or more characters';
        isError = true;
      }
    });

    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password doesn`t match';
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
                email: 'test@mail.ru',
                password: '1111lL',
              }}
              validate={validate}
              onSubmit={(formValues) => {
                fakeServerAPI
                  .post('/login', {
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
                    dispatch(showEditGoalsCard(false));
                    navig('/home');
                  })
                  .catch((error) => error);
              }}
            >
              <Form>
                <FormikInput name="email" />
                <FormikInput name="password" />
                <button type="submit" className="buttonSubmit">
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className={'footer_auth_card'}>
          <p>Don't have an account?</p>
          <button className="button" onClick={() => setCardVie(false)}>
            Register
          </button>
        </div>
      </StyledLoginHolder>
    );
  };

  const getRegisterCard = () => {
    return (
      <StyledLoginHolder>
          <div className="welcome">
          <p>Welcome! Register to start.</p>
        </div>

        <div className={'loginCard'}>
          <div className={'cardBody'}>
            <Formik
              initialValues={{
                email: 'test@mail.ru',
                password: '1111lL',
                confirmPassword: '1111lL',
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
                  })
                  .catch((error) => error);
              }}
            >
              <Form>
                <FormikInput name="email" />
                <FormikInput name="password" />
                <FormikInput name="confirmPassword" />
                <button type="submit" className="buttonSubmit">
                  Register now
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className={'footer_auth_card'}>
          <p>Have an account?</p>
          <button className="button" onClick={() => setCardVie(true)}>
            Log in
          </button>
        </div>
      </StyledLoginHolder>
    );
  };

  if (cardVie) {
    return getLoginCard();
  } else {
    return getRegisterCard();
  }
};
export default Login;
