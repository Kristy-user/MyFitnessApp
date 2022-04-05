import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadingExercisesList } from '../store/actions/exercises';
import { exercisesListSelector } from '../store/selectors/exercises';
import ExerciseItem from '../Layouts/Components/Exercises/ExerciseItem';
import bodyImg from '../assets/images/eJzbY2hgYGAIhwZgngGUhoggyyF48aYGBgCHTQxD.png';
import exercisesDbAPI from '../api/exerciseDB';
import { HeaderTittle } from '../Components/HeaderTittle';

const ExercisesCardStyle = styled.div`
  width: 100%;
  h3 {
    font-size: 18px;
    color: ${(props) => props.theme.fontColor};
    ${HeaderTittle}
  }
  .grid_list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 180px);
    justify-content: center;
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
        <ul className={'grid_list'}>
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
