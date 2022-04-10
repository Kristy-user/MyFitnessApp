import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import fakeServerAPI from '../../../api/fakeServerAPI';
import { ButtonStyle } from '../../../Components/Button';
import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import { ModalContext } from 'HOC/GlobalModalProvider';
import {
  refreshTodayAnalyticsInfo,
  setTodayAnalyticsInfo,
} from '../../../store/actions/todayAnalytics';
import { loadingTodayAnalytics } from '../../../store/actions/todayAnalytics';
<<<<<<< HEAD
import {
  isTodayAnalyticsSelector,
  userAnalyticsDateSelector,
} from '../../../store/selectors/todayAnalytics';
=======
import { userAnalyticsDateSelector } from '../../../store/selectors/todayAnalytics';
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
import { userIdSelector } from '../../../store/selectors/user';
import SubmitWindow from '../../../HOC/ModalContent/SubmitWindow';
import Loader from '../../../Components/Loader';
import { gotApiError } from '../../../store/actions/globalAppStateAction';

const DataTodayWrapper = styled.div`
  border-top: 1px solid gray;
  display: flex;
  flex-direction: column;
  .analytic_title {
    text-transform: uppercase;
    font-size: 18px;
    padding: 5px;
    margin: 15px 0 5px 0;
    text-shadow: 0px 0px 1px ${(props) => props.theme.fontColor};
    color: gray;
    width: fit-content;
    align-self: center;
  }
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
    position: relative;
    top: 0px;
    border: 1px inset ${(props) => props.theme.buttonColor};
    border-radius: 6px;
    padding: 8px;
    text-align: left;
    margin-left: 10%;
    width: 200px;
    background-color: ${(props) => props.theme.unmarckColor};
    color: ${(props) => props.theme.fontColor};
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
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 60px;
    cursor: pointer;
    color: ${(props) => props.theme.fontColor};
  }
  .steps:before {
    content: '\f54b';
  }

  .weight:before {
    content: '\f496';
  }
  .inputNumber {
    width: 100px;
    height: 60px;
    font-size: 30px;
    color: ${(props) => props.theme.fontColor};
    border-radius: 4px;
    margin-top: 4px;
    background-color: ${(props) => props.theme.unmarckColor};
    text-align: center;
  }
  .buttonSubmit {
    ${ButtonStyle}
    align-self: center;
    width: min-content;
    height: min-content;
  }
`;
const DataAnalyticsToday = (props) => {
  const [isShownSteps, setIsShownSteps] = useState(false);
  const [isShownWeight, setIsShownWeight] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const analyticsDataByDays = useSelector(userAnalyticsDateSelector);
<<<<<<< HEAD
  const isTodayAnalyticsSet = useSelector(isTodayAnalyticsSelector);
=======

>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  const openModal = useContext(ModalContext);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isTodayAnalyticsSet);
  useEffect(() => {
    setIsLoaded(false);
    fakeServerAPI
      .get(`/dataTodayAnalytics?userId=${userId}`)
      .then((response) => {
        if (response) {
          dispatch(loadingTodayAnalytics(response.data));
        }
      })
      .then(() => {
        setIsLoaded(true);
<<<<<<< HEAD
      })
      .catch((error) => error);
=======
      });
    // .catch((error) => dispatch(gotApiError(error.message)));
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  }, []);

  const [dataForChekedMonth, setDataForChekedMonth] = useState(
    analyticsDataByDays.find(
      (dataInfo) => dataInfo.date === props.date.toLocaleDateString()
    )
  );

  useEffect(() => {
    setDataForChekedMonth(
      analyticsDataByDays.find(
        (dataInfo) => dataInfo.date === props.date.toLocaleDateString()
      )
    );
  }, [props.date, analyticsDataByDays]);

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
  if (!isLoaded) {
    return <Loader />;
  } else
    return (
      <DataTodayWrapper>
        <p className={'analytic_title'}>current data for today</p>
        <Formik
          initialValues={{
            numberSteps: dataForChekedMonth
              ? dataForChekedMonth.numberSteps
              : '',
            weight: dataForChekedMonth ? dataForChekedMonth.weight : '',
            date: props.date.toLocaleDateString(),
            userId: userId,
          }}
          validate={validate}
          onSubmit={(formValues) => {
            if (dataForChekedMonth && dataForChekedMonth.id) {
              dispatch(
                refreshTodayAnalyticsInfo(formValues, dataForChekedMonth.id)
              );
              openModal(
                <SubmitWindow
                  isTodayAnalyticsSet={isTodayAnalyticsSet}
                  type={'refreshData'}
                  setModal={openModal}
                  date={props.date.toLocaleDateString()}
                />
              );
            } else {
              dispatch(setTodayAnalyticsInfo(formValues));
              openModal(
                <SubmitWindow
                  isTodayAnalyticsSet={isTodayAnalyticsSet}
                  type={'setNewData'}
                  setModal={openModal}
                  date={props.date.toLocaleDateString()}
                />
              );
            }
          }}
          enableReinitialize={true}
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
          <div className={'weight_today hint'}>
            *enter your weight for today.
          </div>
        ) : null}
      </DataTodayWrapper>
    );
};

export default DataAnalyticsToday;
