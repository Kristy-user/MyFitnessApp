import { Form, Formik } from 'formik';

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../../Components/Button';

import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import FormikRadio from '../../../Components/formikFields/FotmikRadio';
import { createNewGoals, loadingUserGoals } from '../../../store/actions/goals';
import { userIdSelector } from '../../../store/selectors/user';
import { goalsSelector } from '../../../store/selectors/goals';
import fakeServerAPI from '../../../api/fakeServerAPI';
import GoalsForm from './GoalsForm';

const MyGoalsStyle = styled.div`
  .goalsTitle {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  h4 {
    padding: 10px;
    font-size: 24px;
    color: ${(props) => props.theme.fontColor};
    text-shadow: 0px 0px 6px #ddf2f5;
    border-radius: 6px;
    background-color: ${(props) => props.theme.headerBackGroundColor};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .inputForm {
    display: flex;
  }
  .goalsItem {
    text-align: left;
    margin: 30px 0 20px 0;
    font-size: 18px;
  }
  .inputNumber {
    align-self: center;
    display: inline-block;
    margin: 20px 0 0 10px;
    max-width: 70px;
    min-height: 30px;
    border: 1px solid black;
    text-align: center;
  }
  .buttonSubmit {
    ${ButtonStyle}
    margin-top: 50px;
    color: ${(props) => props.theme.fontColor};
  }
`;

const MyGoals = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const goals = useSelector(goalsSelector);

  useEffect(() => {
    fakeServerAPI.get('/dataGoals').then((response) => {
      if (response.data[userId]) {
        dispatch(loadingUserGoals(response.data[userId]));
      }
    });
  }, []);

  const validate = (values) => {
    const errors = {};
    let isError = false;
    const keys = Object.keys(values);

    keys.forEach((key) => {
      if (!values[key]) {
        errors[key] = 'Required';
        isError = true;
      } else if (!parseInt(values[key]) && values[key] !== '0') {
        errors[key] = 'Only number';
        isError = true;
      }
    });

    if (isError) return errors;
  };
  if (!goals.water) {
    return (
      <MyGoalsStyle>
        <div className={'goalsTitle'}>
          <h4>Make your plan to reach your goal</h4>
        </div>

        <Formik
          initialValues={{
            water: '',
            powerTraining: '',
            cardioTraining: '',
            steps: '',
          }}
          validate={validate}
          onSubmit={(formValues) => {
            dispatch(createNewGoals(formValues, userId));
          }}
        >
          <Form>
            <div className={'goalWater'} id="my-radio-group">
              <p className="goalsItem">
                1. Сhoose the amount of water you need per day:
              </p>
            </div>
            <div className="inputForm">
              <FormikRadio label="1500" name="water" value="1500 ml" />
              <FormikRadio name="water" value="1800 ml" label="1800" />
              <FormikRadio name="water" value="2100 ml" label="2100" />
              <FormikRadio name="water" value="2400 ml" label="2400" />
              <FormikRadio name="water" value="2700 ml" label="2800" />
            </div>
            <div className="inputForm">
              <p className="goalsItem">
                2. Enter the number of steps you need per day:
              </p>
              <FormikInputNumber className={'inputNumber'} name="steps" />
            </div>
            <div className="inputForm">
              <p className="goalsItem">
                3. Enter the required number of power training per week:
              </p>
              <FormikInputNumber
                className={'inputNumber'}
                name="powerTraining"
              />
            </div>
            <div className="inputForm">
              <p className="goalsItem">
                4. Enter the required number of cardio training you need per
                week:
              </p>
              <FormikInputNumber
                className={'inputNumber'}
                name="cardioTraining"
              />
            </div>

            <button className="buttonSubmit" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </MyGoalsStyle>
    );
  } else {
    return <GoalsForm />;
  }
};

export default MyGoals;
