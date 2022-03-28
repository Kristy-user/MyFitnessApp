import React, { useEffect } from 'react';
import styled from 'styled-components';

import { CardStyle } from '../../Components/CardTemplate';
import { Link, useNavigate } from 'react-router-dom';
import fakeServerAPI from '../../api/fakeServerAPI';
import {
  currentUserPersonalData,
  userPersonalData,
} from '../../store/selectors/userPersonalData';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../../store/selectors/user';
import {
  loadingUserPersonalData,
  setUserPersonalData,
} from '../../store/actions/userPersonalData';
import lendingImg from '../../assets/images/login.jpg';
import UserCardSetting from '../Components/UserCardSetting';

const UserCardStyle = styled.div`
  ${CardStyle}
  background-color: ${(props) => props.theme.headerBackGroundColor};

  color: ${(props) => props.theme.buttonColor};
  padding: 20px 10px;

  .icon:before {
    display: block;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 32px;
  }
  .edit_user,
  .logout_user {
    width: min-content;
    align-items: center;
    &:hover {
      color: ${(props) => props.theme.buttonColor};
      text-shadow: 0px 0px 6px #e6e6e6;
    }
  }
  .logout,
  .edit {
    align-self: flex-end;
  }
  .edit_user:before {
    content: '\f4ff';
  }
  .logout_user:before {
    content: '\f2f5';
  }

  .userName,
  p {
    padding: 10px;
    font-size: 20px;
  }
  .userData {
    display: flex;
    padding: 20px;
    width: max-content;

    & p {
      box-shadow: 0px 0px 6px #e6e6e6;
      margin: 4px;
      border-radius: 6px;
      padding: 10px;
    }
  }
  p,
  span {
    display: block;
  }
`;

const UserCard = () => {
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserPersonalData);

  return (
    <UserCardStyle>
      <div className={'edit'}>
        <Link to={'personalData'} className={'edit_user icon'}></Link>
      </div>
      <div className={'userName'}>
        <h3>
          {currentUser ? currentUser.name : 'Name'}
          {currentUser ? currentUser.surname : 'Surname'},
        </h3>
        <p>{currentUser ? currentUser.age : '--'} years</p>
      </div>
      <div className={'userData'}>
        <p>
          Height:
          <span className="number">
            {currentUser ? currentUser.height : '--'} sm
          </span>
        </p>
        <p>
          Weight:
          <span className="number">
            {currentUser ? currentUser.weight : '--'} kg
          </span>
        </p>
      </div>
      <div className={'logout'}>
        <Link to={'/autorization'} className={'logout_user icon'}></Link>
      </div>
    </UserCardStyle>
  );
};

export default UserCard;
