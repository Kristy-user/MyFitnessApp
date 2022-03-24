import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fakeServerAPI from '../../api/fakeServerAPI';
import { ButtonStyle } from '../../Components/Button';
import FormikInput from '../../Components/formikFields/FormikInput';
import FormikInputNumber from '../../Components/formikFields/FormikInputNumber';
import { HeaderTittle } from '../../Components/HeaderTittle';
import {
  editUserPersonalData,
  refreshUserPersonalData,
  setUserPersonalData,
} from '../../store/actions/userPersonalData';
import { userIdSelector } from '../../store/selectors/user';
import { userPersonalData } from '../../store/selectors/userPersonalData';

const UserDataStyle = styled.div`
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackGroundColor};
  padding: 30px;
  color: ${(props) => props.theme.fontColor};
  .userDataTitle {
    ${HeaderTittle}
  }
  .inputField {
    padding: 10px;

    display: flex;
    flex-direction: row;
    h5 {
      font-size: 24px;
      align-self: center;
      text-align: left;
      display: inline-block;
      margin-right: 20px;
    }
    span {
      padding: 2px;
      background-color: ${(props) => props.theme.cardBackGroundColor};
    }
    input {
      display: inline-block;
      box-shadow: rgba(3, 3, 12, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

      text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
      font-size: 24px;
      height: 30px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.cardBackGroundColor};
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
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (!values[key]) {
        errors[key] = 'Required';
        isError = true;
      }
    });
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
          <ul>
            <li className={'inputField'}>
              <h5>
                1. Enter your <span>name</span>:
              </h5>
              <FormikInput name="name" />
            </li>
            <li className={'inputField'}>
              <h5>
                2. Enter your <span>surname</span>:
              </h5>
              <FormikInput name="surname" />
            </li>
            <li className={'inputField'}>
              <h5>
                3. Enter your <span>age</span>:
              </h5>
              <FormikInputNumber name="age" />
            </li>
            <li className={'inputField'}>
              <h5>
                4. Enter your <span>height</span>:
              </h5>
              <FormikInputNumber name="height" />
            </li>
            <li className={'inputField'}>
              <h5>
                5. Enter your <span>weight</span>:
              </h5>
              <FormikInputNumber name="weight" />
            </li>
          </ul>
          <button className="buttonSubmit" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </UserDataStyle>
  );
};

export default UserCardSetting;
