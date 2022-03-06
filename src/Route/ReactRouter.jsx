import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Autorization from '../Layouts/Autorization/Autorization';
import DayTasks from '../Layouts/Components/DayTasks';
import Home from '../Layouts/Home';
import TypeOfExercise from '../Scenes/Components/Exercises/TypeOfExercise';
import Exercises from '../Scenes/Exercises';
import MyGoals from '../Scenes/Components/Goals/MyGoals';
import { Shedule } from '../Scenes/Shedule';

const RootRouter = () => {
  const user = useSelector((state) => state.userReduser);

  const renderForLoggedInUser = (component) =>
    user.isLoggedIn ? component : <Navigate to={'/autorization'} />;

  const getUserStartPage = () =>
    user.isLoggedIn ? (
      <Navigate to={'/home'} />
    ) : (
      <Navigate to={'/autorization'} />
    );

  return (
    <Routes>
      <Route index element={getUserStartPage()}></Route>
      <Route path={'/autorization'} element={<Autorization />} />
      <Route path={'/home'} element={renderForLoggedInUser(<Home />)}>
        <Route path={'/home'} element={<DayTasks />} />
        <Route path={'goals'} element={<MyGoals />} />
        <Route path={'exercises'} element={<Exercises />} />
        <Route path={'exercises/:type'} element={<TypeOfExercise />} />
        <Route path={'shedule'} element={<Shedule />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
