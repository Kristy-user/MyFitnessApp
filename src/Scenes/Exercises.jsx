import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardStyle } from '../Components/CardTemplate';
import { loadingExercisesList } from '../store/actions/exercises';
import { exercisesListSelector } from '../store/selectors/exercises';
import ExerciseItem from './Components/Exercises/ExerciseItem';
import bodyImg from '../assets/images/eJzbY2hgYGAIhwZgngGUhoggyyF48aYGBgCHTQxD.png';
import exercisesDbAPI from '../api/exerciseDB';

const ExercisesCardStyle = styled.div`
  padding: 30px;
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};

  h3 {
    display: block;
    padding: 20px 0 20px 0;
  }
  .bodyMap {
    min-height: 400px;
    min-width: 350px;
    background-position: center;
    background-size: contain;
    background-image: url(${bodyImg});

    background-repeat: no-repeat;
  }
`;

const Exercises = () => {
  const exercisesList = useSelector(exercisesListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    exercisesDbAPI
      .get('/exercises/bodyPartList')
      .then((response) => {
        dispatch(loadingExercisesList(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ExercisesCardStyle>
      <div className={'bodyPartList'}>
        <h3>Choose body part to exercises:</h3>
        <ul>
          {exercisesList.map((exercise, index) => (
            <ExerciseItem exercise={exercise} key={exercise.id} index={index} />
          ))}
        </ul>
      </div>
      <div className={'bodyMap'}></div>
    </ExercisesCardStyle>
  );
};

export default Exercises;
