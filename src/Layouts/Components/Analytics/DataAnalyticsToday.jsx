import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import fakeServerAPI from '../../../api/fakeServerAPI';
import { ButtonStyle } from '../../../Components/Button';
import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import {
  refreshTodayAnalytics,
  removeTodayInfo,
  setTodayAnalyticsInfo,
} from '../../../store/actions/todayAnalytics';
import { loadingTodayAnalytics } from '../../../store/actions/todayAnalytics';
import { todayAnalyticsDateSelector } from '../../../store/selectors/todayAnalytics';
import { userIdSelector } from '../../../store/selectors/user';
import DayTasks from '../../MainLayout/DayTasks';

const DataTodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
  }
  .data_input {
    margin: 10px 0 0 10px;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    border-radius: 6px;
    padding: 10px;
  }
  .hint {
    border: 1px inset ${(props) => props.theme.buttonColor};
    border-radius: 6px;
    padding: 8px;
    text-align: left;
    margin-left: 10%;
    width: 200px;
    background-color: rgb(222, 255, 253);
    color: ${(props) => props.theme.headerBackGroundColor};
  }
  .steps_today {
    margin-left: 12%;
  }
  .weight_today {
    align-self: flex-end;
    margin-right: 10%;
  }
  .icon:before {
    display: inline;
    margin-right: 10px;
    text-shadow: 0px 0px 6px #e6e6e6;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 60px;
    cursor: pointer;
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
  }
  .steps:before {
    content: '\f54b';
  }

  .weight:before {
    content: '\f496';
  }
  .inputNumber {
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};
    width: 100px;
    height: 60px;
    font-size: 30px;
    color: ${(props) => props.theme.fontColor};
    border-radius: 4px;
    margin-top: 4px;
    background-color: gray;
    text-align: center;
  }
  .buttonSubmit {
    ${ButtonStyle}
    align-self: center;
    width: min-content;
    height: min-content;
  }
`;
const DataAnalyticsToday = () => {
  const [isShownSteps, setIsShownSteps] = useState(false);
  const [isShownWeight, setIsShownWeight] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const analyticsDataByDays = useSelector(todayAnalyticsDateSelector);

  useEffect(() => {
    fakeServerAPI
      .get(`/dataTodayAnalytics?userId=${userId}`)
      .then((response) => dispatch(loadingTodayAnalytics(response.data)));
  }, []);

  const isDataToday =
    analyticsDataByDays.find(
      (dataInfo) => dataInfo.date === new Date().toLocaleDateString()
    ) || {};

  const validate = (values) => {
    const errors = {};
    let isError = false;
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (!values[key]) {
        errors[key] = 'Required';
        isError = true;
      } else if (values[key] == 0) {
        errors[key] = 'number > 0';
        isError = true;
      } else if (!parseInt(values[key])) {
        errors[key] = 'Only number';
        isError = true;
      }
    });
    if (isError) return errors;
  };
  return (
    <DataTodayWrapper>
      <Formik
        initialValues={{
          numberSteps: isDataToday.numberSteps ? isDataToday.numberSteps : '',
          weight: isDataToday.weight ? isDataToday.weight : '',
          date: new Date().toLocaleDateString(),
        }}
        validate={validate}
        onSubmit={(formValues) => {
          if (isDataToday.numberSteps && isDataToday.weight) {
            dispatch(removeTodayInfo(isDataToday.id));
            dispatch(setTodayAnalyticsInfo(formValues));
          } else {
            dispatch(setTodayAnalyticsInfo(formValues, userId));
          }
        }}
      >
        <Form>
          <div className={'data_input'}>
            <div
              onMouseEnter={() => setIsShownSteps(true)}
              onMouseLeave={() => setIsShownSteps(false)}
              className={'icon steps'}
            ></div>
            <FormikInputNumber className={'inputNumber'} name="numberSteps" />
          </div>
          <button className="buttonSubmit" type="submit">
            Submit
          </button>
          <div className={'data_input'}>
            <div
              onMouseEnter={() => setIsShownWeight(true)}
              onMouseLeave={() => setIsShownWeight(false)}
              className={'icon weight'}
            ></div>
            <FormikInputNumber className={'inputNumber'} name="weight" />
          </div>
        </Form>
      </Formik>
      {isShownSteps ? (
        <div className={'steps_today hint'}>
          *enter the number of steps you have walked for today.
        </div>
      ) : null}
      {isShownWeight ? (
        <div className={'weight_today hint'}>*enter your weight for today.</div>
      ) : null}
    </DataTodayWrapper>
  );
};

export default DataAnalyticsToday;
