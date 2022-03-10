import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fakeServerAPI from '../api/fakeServerAPI';
import { ButtonStyle } from '../Components/Button';
import FormikInput from '../Components/formikFields/FormikInput';
import FormikInputNumber from '../Components/formikFields/FormikInputNumber';
import {
  editUserPersonalData,
  refreshUserPersonalData,
  setUserPersonalData,
} from '../store/actions/userPersonalData';
import { userIdSelector } from '../store/selectors/user';
import { userPersonalData } from '../store/selectors/userPersonalData';

const UserDataStyle = styled.div`
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
  padding: 30px;
  color: ${(props) => props.theme.fontColor};
  .userDataTitle {
    font-size: 32px;
    font-weight: 400;
    color: ${(props) => props.theme.fontColor};
    text-shadow: 0px 0px 6px #9b8f8f;
    margin: 20px auto;
  }
  .inputField {
    padding: 10px;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    p {
      display: inline-block;
      margin-right: 20px;
    }
    input {
      display: inline-block;
      box-shadow: rgba(3, 3, 12, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

      text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
      font-size: 24px;
      height: 30px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.cardBackgroundColor};
    }
  }

  .buttonSubmit {
    ${ButtonStyle}
    margin-top: 50px;
    color: ${(props) => props.theme.fontColor};
  }
`;

const UserCardSetting = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const { name, surname, age, height, weight } = useSelector(userPersonalData);
  const navig = useNavigate();
  useEffect(() => {
    fakeServerAPI.get('/userPersonalData').then((response) => {
      if (response.data[userId]) {
        dispatch(setUserPersonalData(response.data[userId]));
      }
    });
  }, []);

  const validate = (values) => {
    const errors = {};
    let isError = false;
    if (isError) return errors;
  };

  return (
    <UserDataStyle>
      <div className={'userDataTitle'}>
        <h4>Fill in your personal details.</h4>
      </div>

      <Formik
        initialValues={{
          name: name ? name : '',
          surname: surname ? surname : '',
          age: age ? age : '',
          height: height ? height : '',
          weight: weight ? weight : '',
        }}
        validate={validate}
        onSubmit={(formValues) => {
          dispatch(refreshUserPersonalData(formValues, userId));
          dispatch(editUserPersonalData(true));
          navig('/home');
        }}
      >
        <Form>
          <div className={'inputField'}>
            <p>1. Enter your name:</p>
            <FormikInput name="name" />
          </div>
          <div className={'inputField'}>
            <p>2. Enter your surname:</p>
            <FormikInput name="surname" />
          </div>
          <div className={'inputField'}>
            <p>3. Enter your age:</p>
            <FormikInputNumber name="age" />
          </div>
          <div className={'inputField'}>
            <p>4. Enter your height:</p>
            <FormikInputNumber name="height" />
          </div>
          <div className={'inputField'}>
            <p>5. Enter your weight:</p>
            <FormikInputNumber name="weight" />
          </div>
          <button className="buttonSubmit" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </UserDataStyle>
  );
};

export default UserCardSetting;
