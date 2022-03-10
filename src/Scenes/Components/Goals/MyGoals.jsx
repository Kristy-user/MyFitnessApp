import { Form, Formik } from 'formik';

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../../Components/Button';

import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import FormikRadio from '../../../Components/formikFields/FotmikRadio';
import {
  createNewGoals,
  editGoal,
  loadingUserGoals,
} from '../../../store/actions/goals';
import { userIdSelector } from '../../../store/selectors/user';
import { goalsSelector } from '../../../store/selectors/goals';
import fakeServerAPI from '../../../api/fakeServerAPI';
import GoalsForm from './GoalsForm';

const MyGoalsStyle = styled.div`
  .goalsTitle {
    box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
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
    max-width: 100px;
    min-height: 30px;
    font-size: 22px;
    /* color: ${(props) => props.theme.appBackGroundColor}; */
    border-radius: 4px;
    padding: 5px;
    background-color: ${(props) => props.theme.buttonColor};
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
  if (!goals.isEdited) {
    return (
      <MyGoalsStyle>
        <div className={'goalsTitle'}>
          <h4>Make your plan to reach your goal</h4>
        </div>

        <Formik
          initialValues={{
            water: goals.water ? goals.water : 'null',
            powerTraining: goals.powerTraining ? goals.powerTraining : '',
            cardioTraining: goals.cardioTraining ? goals.cardioTraining : '',
            steps: goals.steps ? goals.steps : '',
            weight: goals.weight ? goals.weight : '',
          }}
          validate={validate}
          onSubmit={(formValues) => {
            dispatch(createNewGoals(formValues, userId));
            dispatch(editGoal(true));
          }}
        >
          <Form>
            <div className={'goalWater'} id="my-radio-group">
              <p className="goalsItem">
                1. Сhoose the amount of water you need per day:
              </p>
            </div>
            <div className="inputForm">
              <FormikRadio name="water" value="1500" label="1500" />
              <FormikRadio name="water" value="1800" label="1800" />
              <FormikRadio name="water" value="2100" label="2100" />
              <FormikRadio name="water" value="2400" label="2400" />
              <FormikRadio name="water" value="2700" label="2700" />
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
            <div className="inputForm">
              <p className="goalsItem">
                4. Enter the weight you want to reach:
              </p>
              <FormikInputNumber className={'inputNumber'} name="weight" />
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
