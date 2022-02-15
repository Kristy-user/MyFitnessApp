import React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../Components/Button';
import { CardStyle } from '../../Components/CardTemplate';
import { Link } from 'react-router-dom';
// const Button = styled.button`
//   ${ButtonStyle}
// `;

const UserCardStyle = styled.div`
  ${CardStyle}
  padding: 20px 10px;
  .icon:before {
    display: block;
    font-weight: 700;
    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Brands';
    font-size: 32px;
  }
  .edit_user,
  .logout_user {
    color: ${(props) => props.theme.fontColor};
    width: min-content;
    align-items: center;
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
      margin: 4px;
      border-radius: 6px;
      border: 2px solid ${(props) => props.theme.cardBackgroundColor};
      padding: 10px;
    }
  }
  p,
  span {
    display: block;
  }
`;

const UserCard = () => {
  return (
    <UserCardStyle>
      <div className={'edit'}>
        <Link to={'/edit'} className={'edit_user icon'}></Link>
      </div>
      <div className={'userName'}>
        <h3>Name Surname,</h3>
        <p>xx years</p>
      </div>
      <div className={'userData'}>
        <p>
          Height: <span> zzz sm</span>
        </p>
        <p>
          Weight:<span> xx kg</span>
        </p>
      </div>
      <div className={'logout'}>
        <Link to={'/logout'} className={'logout_user icon'}></Link>
      </div>
    </UserCardStyle>
  );
};

export default UserCard;
