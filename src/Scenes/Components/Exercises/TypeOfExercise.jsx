import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CardStyle } from '../../../Components/CardTemplate';
import { loadingAllExercises } from '../../../store/actions/exercises';
import { useDispatch, useSelector } from 'react-redux';
import exercisesDbAPI from '../../../api/exerciseDB';
import { StyledLoader } from '../../../Components/Loader';
import { allExercisesSelector } from '../../../store/selectors/exercises';
import GifPlayer from 'react-gif-player';
import { useRef } from 'react';
import buttonPlay from '../../../assets/images/buttonPlay.png';

const StyledLoadingWrapper = styled.div`
  ${StyledLoader}
`;

const StyledCard = styled.div`
  padding: 20px 10px;
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
  li {
    color: ${(props) => props.theme.fontColor};
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
  img {
    padding: 5px;
    width: 250px;
  }
`;

const TypeOfExercise = () => {
  const params = useParams();
  const [playing, setPlaying] = useState(true);

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
                <strong>
                  {index + 1}.{exercise.name.toUpperCase()}
                </strong>
                &nbsp;
                <GifPlayer
                  gif={exercise.gifUrl}
                  onTooglePlay={() => setPlaying(!playing)}
                  title={exercise.name}
                />
              </li>
            ))
        )}
      </ul>
    </StyledCard>
  );
};

export default TypeOfExercise;
