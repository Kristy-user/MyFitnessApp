import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadingAllExercises } from '../../../store/actions/exercises';
import { useDispatch, useSelector } from 'react-redux';
import exercisesDbAPI from '../../../api/exerciseDB';
import Loader from '../../../Components/Loader';
import { allExercisesSelector } from '../../../store/selectors/exercises';
import GifPlayer from 'react-gif-player';
import buttonPlay from '../../../assets/images/button.jpg';
import { HeaderTittle } from '../../../Components/HeaderTittle';
const StyledCard = styled.div`
  h3 {
    ${HeaderTittle}
  }
  .grid_img {
    display: grid;
    align-items: flex-end;
    grid-template-columns: repeat(2, 1fr);
  }
  li {
    color: ${(props) => props.theme.appackGroundColor};
    padding: 20px;
  }
  img {
    margin: 10px;
    width: 250px;
    border-radius: 6px;
    background: white;
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
      .catch((err) => err);
  }, []);

  return (
    <StyledCard>
      <h3>Exercises to {params.type}: </h3>
      <div>
        <ul className={'grid_img'}>
          {!allExercises ? (
            <Loader />
          ) : (
            allExercises
              .filter((ex) => ex.bodyPart === params.type)
              .map((exercise, index) => (
                <li key={exercise.id} index={index}>
                  <p>
                    <strong>{index + 1}.</strong>
                    &nbsp; {exercise.name.toUpperCase()}
                  </p>
                  <GifPlayer
                    gif={exercise.gifUrl}
                    still={buttonPlay}
                    autoplay={false}
                    title={exercise.name}
                  />
                </li>
              ))
          )}
        </ul>
      </div>
    </StyledCard>
  );
};

export default TypeOfExercise;
