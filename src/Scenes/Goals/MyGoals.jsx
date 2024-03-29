import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
('../../../store/actions/goals');
import GoalsForm from '../Components/Goals/GoalsForm';
import { HeaderTittle } from '../../Components/HeaderTittle';
import { ButtonStyle } from '../../Components/Button';
import { createNewGoals, refreshGoals } from '../../store/actions/goals';
import { userIdSelector } from '../../store/selectors/user';
import {
  currentGoalsSelector,
  showEditGoalsSelector,
} from '../../store/selectors/goals';
import FormikInputNumber from '../../Components/formikFields/FormikInputNumber';
import FormikRadio from '../../Components/formikFields/FormikRadio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  allActivitiesDoneSelector,
  waterDoneSelector,
} from '../../store/selectors/analytics';
import { ModalContext } from 'HOC/GlobalModalProvider';
import ErrorWindow from '../../HOC/ModalContent/ErrorWindow';

const MyGoalsStyle = styled.div`
  h4 {
    ${HeaderTittle}
    margin-bottom: 0;
  }
  .date_picker {
    border: none;
    font-size: 22px;
    text-align: center;
    width: min-content;
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
    margin: 10px;
    padding: 5px;
    display: inline-block;
    background-color: ${(props) => props.theme.unmarckColor};
    color: ${(props) => props.theme.fontColor};
    border-radius: 6px;
    &:focus {
      outline: none;
    }
  }
  .react-datepicker-wrapper {
    width: max-content;
    div {
      width: max-content;
    }
    input {
      max-width: 130px;
    }
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 0.3rem;
    background-color: #fff;
    color: inherit;
  }
  .react-datepicker__month-text:hover {
    background-color: ${(props) => props.theme.cardBackGroundColor};
    color: ${(props) => props.theme.headerBackGroundColor};
  }
  .react-datepicker__month--selected {
    color: ${(props) => props.theme.headerBackGroundColor};
    background-color: ${(props) => props.theme.buttonColor};
    & :hover {
      color: ${(props) => props.theme.buttonColor};
      background-color: ${(props) => props.theme.cardBackGroundColor};
    }
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
    color: ${(props) => props.theme.fontColor};
    border-radius: 4px;
    padding: 5px;
    background-color: ${(props) => props.theme.unmarckColor};
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
  const userGoals = useSelector(currentGoalsSelector);
  const showEditGoals = useSelector(showEditGoalsSelector);
  const allTrainingFullfilled = useSelector(allActivitiesDoneSelector);
  const userWaterFullfilled = useSelector(waterDoneSelector);
  const openModal = useContext(ModalContext);
  const [startDate, setStartDate] = useState(new Date());
  let currentDate = startDate.toLocaleDateString().slice(-7);
  const currentGoals = userGoals.find((goal) => goal.date == currentDate);

  const currentPowerTrainingFullfilled = allTrainingFullfilled
    .filter((item) => item.date.slice(-7) == currentDate)
    .map((item) => item.numberPowerTraining);
  const currentCardioTrainingFullfilled = allTrainingFullfilled
    .filter((item) => item.date.slice(-7) == currentDate)
    .map((item) => item.numberCardioTraining);
  const currentWaterFullfilled = userWaterFullfilled
    .filter((item) => item.date.slice(-7) == currentDate)
    .map((item) => item.numberFullGlass);

  const maxFullfilledWaterGoal =
    Math.max.apply(null, currentWaterFullfilled) * 300;

  const [viewGoals, setViewGoals] = useState(false);
  useEffect(() => {
    setViewGoals(showEditGoals);
  }, [showEditGoals]);

  const validate = (values) => {
    const errors = {};
    let isError = false;
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (!values[key]) {
        errors[key] = 'Required';
        isError = true;
      } else if (values[key].match(/[^0-9'".]/)) {
        errors[key] = 'Only number';
        isError = true;
      }
    });
    if (values.water < maxFullfilledWaterGoal) {
      errors.water = `This value less than your entered's value  in this month (${maxFullfilledWaterGoal} ml)`;
      openModal(<ErrorWindow setModal={openModal} error={errors.water} />);
      isError = true;
    } else if (
      values.powerTraining < currentPowerTrainingFullfilled &&
      values.powerTraining != ''
    ) {
      errors.powerTraining = `This value less than your entered's value  of power training's fullfiiled (${currentPowerTrainingFullfilled} training)`;
      isError = true;
    }
    if (
      values.cardioTraining < currentCardioTrainingFullfilled &&
      values.cardioTraining != ''
    ) {
      errors.cardioTraining = `This value less than your entered's value  of cardio training's fullfiiled (${currentCardioTrainingFullfilled}training)`;
      isError = true;
    }
    if (isError) return errors;
  };

  if (viewGoals) {
    return (
      <MyGoalsStyle>
        <div className={'goalsTitle'}>
          <h4>Make your plan to reach your goal in this month:</h4>
          <DatePicker
            popperPlacement="left-start"
            className={'date_picker'}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <Formik
          initialValues={{
            water: currentGoals ? currentGoals.water : null,
            powerTraining: currentGoals ? currentGoals.powerTraining : '',
            cardioTraining: currentGoals ? currentGoals.cardioTraining : '',
            steps: currentGoals ? currentGoals.steps : '',
            weight: currentGoals ? currentGoals.weight : '',
          }}
          validate={validate}
          onSubmit={(formValues) => {
            let { water, powerTraining, cardioTraining, steps, weight } =
              formValues;

            if (currentGoals && currentGoals.date == currentDate) {
              dispatch(
                refreshGoals(
                  {
                    water,
                    powerTraining,
                    cardioTraining,
                    steps,
                    weight,
                    userId,
                    date: currentDate,
                  },
                  currentGoals.id
                )
              );
            } else {
              dispatch(
                createNewGoals({
                  water,
                  powerTraining,
                  cardioTraining,
                  steps,
                  weight,
                  userId,
                  date: currentDate,
                })
              );
            }
          }}
          enableReinitialize={true}
        >
          {({ values }) => (
            <Form>
              <div className={'goalWater'} id="my-radio-group">
                <p className="goalsItem">
                  1. Сhoose the amount of water you need per day:
                </p>
              </div>
              <div className="inputForm">
                <FormikRadio
                  name="water"
                  value="1500"
                  label="1500"
                  cheked={values.water}
                />
                <FormikRadio
                  cheked={values.water}
                  name="water"
                  value="1800"
                  label="1800"
                />
                <FormikRadio
                  cheked={values.water}
                  name="water"
                  value="2100"
                  label="2100"
                />
                <FormikRadio
                  cheked={values.water}
                  name="water"
                  value="2400"
                  label="2400"
                />
                <FormikRadio
                  cheked={values.water}
                  name="water"
                  value="2700"
                  label="2700"
                />
              </div>
              <div className="inputForm">
                <p className="goalsItem">
                  2. Enter the number of steps you need per day:
                </p>
                <FormikInputNumber className={'inputNumber'} name="steps" />
              </div>
              <div className="inputForm">
                <p className="goalsItem">
                  3. Enter the required number of power training per month:
                </p>
                <FormikInputNumber
                  className={'inputNumber'}
                  name="powerTraining"
                />
              </div>
              <div className="inputForm">
                <p className="goalsItem">
                  4. Enter the required number of cardio training you need per
                  month:
                </p>
                <FormikInputNumber
                  className={'inputNumber'}
                  name="cardioTraining"
                />
              </div>
              <div className="inputForm">
                <p className="goalsItem">
                  4. Enter the weight you want to reach (kg):
                </p>
                <FormikInputNumber className={'inputNumber'} name="weight" />
              </div>
              <button className="buttonSubmit" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </MyGoalsStyle>
    );
  } else {
    return (
      <GoalsForm
        goals={currentGoals}
        date={startDate.toLocaleDateString().slice(-7)}
      />
    );
  }
};

export default MyGoals;
