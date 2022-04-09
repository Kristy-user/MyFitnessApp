import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'HOC/GlobalThemeProvider';
import NavigateBlock from './MainLayout/NavigateBlock';
import UserCard from './MainLayout/UserCard';
import { Outlet } from 'react-router-dom';
import background from 'assets/images/background.jpg';
import { LogoStyle } from '../Components/Logo';
import { userIdSelector } from '../store/selectors/user';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import fakeServerAPI from '../api/fakeServerAPI';
import { loadingUserPersonalData } from '../store/actions/userPersonalData';
import BMI from './Components/UserPersonalInfo/BMI';
import { apiError } from '../store/selectors/globalAppState';
import { gotApiError } from '../store/actions/globalAppStateAction';
import { ModalContext } from 'HOC/GlobalModalProvider';
import ErrorWindow from '../HOC/ModalContent/ErrorWindow';

const StyledLayout = styled.div`
  margin: auto;
  text-align: center;
  background-image: url(${background});

  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;

  .logo {
    ${LogoStyle}
    margin: 0 5%;
    align-self: flex-start;
    font-size: 36px;
    text-shadow: 0px 0px 6px ${(props) => props.theme.buttonColor};

    position: relative;
    animation: glow 2s ease-in-out infinite;
    @keyframes glow {
      from {
        text-shadow: 0 0 20px ${(props) => props.theme.buttonColor};
      }
      to {
        text-shadow: 0 0 30px ${(props) => props.theme.shadowColor},
          0 0 10px ${(props) => props.theme.buttonColor};
      }
    }
  }

  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.fontColor};
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.headerBackGroundColor};
    font-size: 30px;
  }

  .content {
    background-color: '#dde0e0';
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  }
  .leftLayout,
  .mainLayout,
  .rightLayout {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  .leftLayout,
  .rightLayout {
    max-width: 20%;
  }
  .mainLayout {
    border-radius: 6px;
    padding: 25px;
    background-color: ${(props) => props.theme.cardBackGroundColor};
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 62px;
    height: 34px;
    right: 30px;
    & input {
      display: none;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.appBackGroundColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: ${(props) => props.theme.toggleButtonColor};
      -webkit-transition: 0.6s;
      transition: 0.6s;
    }
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.appBackGroundColor};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.headerBackGroundColor};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }
`;

const Home = () => {
  const changeTheme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const error = useSelector(apiError);
  const openModal = useContext(ModalContext);
  useEffect(() => {
    fakeServerAPI.get(`/userPersonalData?userId=${userId}`).then((response) => {
      if (response.data) {
        dispatch(loadingUserPersonalData(response.data));
      }
    });
    // .catch((error) => {
    //   dispatch(gotApiError(error.message));
    // });
  }, []);

  // const openModalTask = (error) => {
  //   openModal(<ErrorWindow error={error} setModal={openModal} />);
  // };
  // useEffect(() => {
  //   if (error) {
  //     openModalTask(error);
  //   }
  // }, [error]);
  return (
    <StyledLayout>
      <div className={'header'}>
        <div className={'logo'}>
          <span>TimeToSport</span>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            onChange={() => changeTheme((prev) => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className={'content'}>
        <div className="leftLayout">
          <NavigateBlock />
        </div>
        <div className="mainLayout">
          <Outlet />
        </div>
        <div className="rightLayout">
          <UserCard />
          <ToastContainer />
          <BMI />
        </div>
      </div>
    </StyledLayout>
  );
};
export default Home;
