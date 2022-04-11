import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Autorization from '../Layouts/Autorization/Autorization';
import DayTasks from '../Layouts/MainLayout/DayTasks';
import Home from '../Layouts/Home';
import TypeOfExercise from 'Scenes/Components/Exercises/TypeOfExercise';
import Exercises from 'Scenes/Exercises/Exercises';
import MyGoals from '../Scenes/Goals/MyGoals';
import UserCardSetting from 'Scenes/Components/UserPersonalInfo/UserCardSetting';
import Analytics from 'Scenes/Analytics/Analytics';
import { Shedule } from '../Scenes/Shedule/Shedule';

import Page404 from 'Components/Page404';

const RootRouter = () => {
  const user = useSelector((state) => state.userReduser);

  const renderForLoggedInUser = (component) =>
    !user.isLoggedIn ? <Navigate to={'/autorization'} /> : component;

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
      <Route path={'*'} element={<Page404 />} />
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
