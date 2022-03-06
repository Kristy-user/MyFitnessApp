import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardStyle } from '../../../Components/CardTemplate';
import FormikInputNumber from '../../../Components/formikFields/FormikInputNumber';
import { ModalContext } from '../../../HOC/GlobalModalProvider';
import EditCard from '../../../HOC/ModalContent/EditCard';
import { goalsSelector } from '../../../store/selectors/goals';

const GoalsFormStyle = styled.div`
  background-color: #fff;
  h3 {
    font-size: 26px;
    color: ${(props) => props.theme.fontColor};
    text-shadow: ${(props) => props.theme.appBackGroundColor};
    margin: 30px auto;
  }
  span {
    margin-left: 10px;
    color: ${(props) => props.theme.fontColor};
    border-radius: 6px;
    padding: 5px;
    background-color: ${(props) => props.theme.appBackGroundColor};
    cursor: pointer;
  }
  li {
    line-height: 1.8;
    text-align: left;
    font-size: 20px;
    padding: 10px;
  }
  li::before {
    content: '✒';
    padding-right: 10px;
    color: ${(props) => props.theme.fontColor};
  }
`;

const GoalsForm = () => {
  const [openInputName, setOpenInputName] = useState(false);
  const goals = useSelector(goalsSelector);
  const editGoalValue = useContext(ModalContext);

  return (
    <GoalsFormStyle>
      <div>
        <h3>My Goals:</h3>
        <Formik
          initialValues={{
            water: `${goals.water}`,
            powerTraining: `${goals.powerTraining}`,
            cardioTraining: `${goals.cardioTraining}`,
            steps: `${goals.steps}`,
          }}
          // validate={validate}
          onSubmit={(formValues) => {
            dispatch(createNewGoals(formValues, userId));
          }}
        >
          <Form>
            <ul>
              <li>
                The amount of water per day:
                {openInputName === 'water' ? (
                  <FormikInputNumber name="water" />
                ) : (
                  <span
                    onClick={() => {
                      setOpenInputName('water');
                    }}
                  >
                    {goals.water}
                  </span>
                )}
              </li>
              <li>
                The number of steps per day:
                {openInputName === 'steps' ? (
                  <FormikInputNumber name="steps" />
                ) : (
                  <span
                    onClick={() => {
                      setOpenInputName('steps');
                    }}
                  >
                    {goals.steps.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}
                  </span>
                )}
              </li>
              <li>
                The required number of power training per week:
                {openInputName === 'powerTraining' ? (
                  <FormikInputNumber name="powerTraining" />
                ) : (
                  <span
                    onClick={() => {
                      setOpenInputName('powerTraining');
                    }}
                  >
                    {goals.powerTraining}
                  </span>
                )}
              </li>
              <li>
                The required number of cardio training you need per week:
                {openInputName === 'cardioTraining' ? (
                  <FormikInputNumber name="cardioTraining" />
                ) : (
                  <span
                    onClick={() => {
                      setOpenInputName('cardioTraining');
                    }}
                  >
                    {goals.cardioTraining}
                  </span>
                )}
              </li>
            </ul>
          </Form>
        </Formik>
      </div>
      <button></button>
    </GoalsFormStyle>
  );
};

export default GoalsForm;
