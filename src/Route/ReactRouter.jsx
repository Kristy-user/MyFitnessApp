import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DayTasks from '../Layouts/Components/DayTasks';
import TypeOfExercise from '../Scenes/Components/Exercises/TypeOfExercise';

import Exercises from '../Scenes/Exercises';
import { Shedule } from '../Scenes/Shedule';

const RootRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<DayTasks />} />
      <Route path={'/exercises'} element={<Exercises />} />
      <Route path={'/exercises/:type'} element={<TypeOfExercise />} />
      <Route path={'/shedule'} element={<Shedule />} />
    </Routes>
  );
};

export default RootRouter;
