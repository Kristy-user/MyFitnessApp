import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CardStyle } from '../../Components/CardTemplate';
import { Link, useNavigate } from 'react-router-dom';
import {
  currentUserAvatar,
  currentUserPersonalData,
} from '../../store/selectors/userPersonalData';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../../store/selectors/user';
import { logOut } from '../../store/actions/user';
import UserAvatar from '../Components/UserPersonalInfo/UserAvatar';
import { loadingUserAvatar } from '../../store/actions/userPersonalData';
import fakeServerAPI from '../../api/fakeServerAPI';
import { gotApiError } from '../../store/actions/globalAppStateAction';

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
      text-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
      cursor: pointer;
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
    padding: 10px;
    width: max-content;
    margin: 0 auto;
    & p {
      box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
      margin: 6px;
      border-radius: 6px;
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
  const navig = useNavigate();

  useEffect(() => {
    dispatch(gotApiError(''));
    fakeServerAPI
      .get(`/userAvatar?userId=${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch(loadingUserAvatar(response.data));
        }
      })
<<<<<<< HEAD
      .catch((error) => error);
=======
      .catch((error) => {
        dispatch(gotApiError(error.message));
      });
>>>>>>> 20b2bdd4f397d1e8ebccd45fa4e65c751ae19ac5
  }, []);

  const logOutUser = () => {
    navig('/autorization');
    <Link to={'/autorization'} className={'logout_user icon'}></Link>;
    dispatch(logOut());
  };
  return (
    <UserCardStyle>
      <div className={'edit'}>
        <Link to={'personalData'} className={'edit_user icon'}></Link>
      </div>
      <UserAvatar userId={userId} button={false} />
      <div className={'userName'}>
        <h3>
          {currentUser ? currentUser.name : 'Name'}&nbsp;
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
      <div className={'logout'} onClick={logOutUser}>
        <div className={'logout_user icon'}></div>
      </div>
    </UserCardStyle>
  );
};

export default UserCard;
