import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonStyle } from 'Components/Button';
import FormikInput from '../../../Components/formikFields/FormikInput';
import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import { HeaderTittle } from '../../../Components/HeaderTittle';
import {
  newUserPersonalData,
  refreshUserPersonalData,
} from '../../../store/actions/userPersonalData';
import { userIdSelector } from '../../../store/selectors/user';
import { currentUserPersonalData } from '../../../store/selectors/userPersonalData';
import UserAvatar from './UserAvatar';

const UserDataStyle = styled.div`
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackGroundColor};
  padding: 30px;
  color: ${(props) => props.theme.fontColor};
  display: flex;

  .text_info {
    width: 70%;
  }
  .avatar {
    margin: 0 auto;
    align-self: center;
  }
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
      font-size: 24px;
      height: 30px;
      border-radius: 6px;
      background-color: ${(props) => props.theme.cardBackGroundColor};
    }
  }

  .buttonSubmit {
    ${ButtonStyle}
    margin-top: 50px;
    color: ${(props) => props.theme.headerBackGroundColor};
  }
`;

const UserCardSetting = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const currentUser = useSelector(currentUserPersonalData);
  const navig = useNavigate();

  const validate = (values) => {
    const correctNameSurname = /^[[a-zA-Z]{3,16}$/;
    const correctNumberValues = /^\d{1,3}$/;
    const errors = {};
    let isError = false;

    if (!values.name.match(correctNameSurname)) {
      errors.name =
        'Invalid name. Name must contain only letters, at least 3 and no more than 16.';
      isError = true;
    }
    if (!values.surname.match(correctNameSurname)) {
      errors.surname =
        'Invalid surname. Surname must contain only letters, at least 3 and no more than 16.';
      isError = true;
    }
    if (!values.age.match(correctNumberValues)) {
      errors.age = 'Incorrect age';
      isError = true;
    }
    if (!values.weight.match(correctNumberValues)) {
      errors.weight = 'Incorrect weight';
      isError = true;
    }
    if (!values.height.match(correctNumberValues)) {
      errors.height = 'Incorrect height';
      isError = true;
    }
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
      <div className={'text_info'}>
        <div className={'userDataTitle'}>
          <h4>Fill in your personal details.</h4>
        </div>
        <Formik
          initialValues={{
            name: currentUser ? currentUser.name : '',
            surname: currentUser ? currentUser.surname : '',
            age: currentUser ? currentUser.age : '',
            height: currentUser ? currentUser.height : '',
            weight: currentUser ? currentUser.weight : '',
          }}
          validate={validate}
          onSubmit={(formValues) => {
            if (currentUser) {
              dispatch(refreshUserPersonalData(formValues, currentUser));
            } else {
              dispatch(newUserPersonalData(formValues, userId));
            }

            navig('/home');
          }}
          enableReinitialize={true}
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
      </div>
      <div className={'avatar'}>
        <UserAvatar userId={userId} button={true} />
      </div>
    </UserDataStyle>
  );
};

export default UserCardSetting;
