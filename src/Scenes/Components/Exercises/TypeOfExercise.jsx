import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CardStyle } from '../../../Components/CardTemplate';
import { loadingAllExercises } from '../../../store/actions/exercises';
import { useDispatch, useSelector } from 'react-redux';
import exercisesDbAPI from '../../../api/exerciseDB';
import { StyledLoader } from '../../../Components/Loader';
import { allExercisesSelector } from '../../../store/selectors/exercises';
const StyledLoadingWrapper = styled.div`
  ${StyledLoader}
`;

const StyledCard = styled.div`
  ${CardStyle}
  padding: 20px 10px;

  li {
    padding: 20px;
    display: inline-block;
  }
  img {
    border-radius: 50%;
    width: 250px;
  }
`;

const TypeOfExercise = () => {
  const params = useParams();
  const allExercises = useSelector(allExercisesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    exercisesDbAPI
      .get('/exercises')
      .then((response) => {
        dispatch(loadingAllExercises(response.data.slice(1, 301)));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledCard>
      <h3>Exercises to {params.type}: </h3>
      <ul>
        {!allExercises ? (
          <StyledLoadingWrapper>
            <div></div>
            <div></div>
            <div></div>
          </StyledLoadingWrapper>
        ) : (
          allExercises
            .filter((ex) => ex.bodyPart === params.type)
            .map((exercise, index) => (
              <li key={exercise.id} index={index}>
                <strong>{index + 1}.</strong>
                &nbsp;
                <img src={exercise.gifUrl} title={exercise.name} />
              </li>
            ))
        )}
      </ul>
    </StyledCard>
  );
};

export default TypeOfExercise;
