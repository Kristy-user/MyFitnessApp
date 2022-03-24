import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Autorization from '../Layouts/Autorization/Autorization';
import DayTasks from '../Layouts/MainLayout/DayTasks';
import Home from '../Layouts/Home';
import TypeOfExercise from '../Layouts/Components/Exercises/TypeOfExercise';
import Exercises from '../Scenes/Exercises';
import MyGoals from '../Scenes/Goals/MyGoals';
import { Shedule } from '../Scenes/Shedule';
import UserCardSetting from '../Layouts/Components/UserCardSetting';
import Analytics from '../Scenes/Analytics';

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
        <Route path={'personalData'} element={<UserCardSetting />} />
        <Route path={'goals'} element={<MyGoals />} />
        <Route path={'exercises'} element={<Exercises />} />
        <Route path={'exercises/:type'} element={<TypeOfExercise />} />
        <Route path={'shedule'} element={<Shedule />} />
        <Route path={'analytics'} element={<Analytics />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
