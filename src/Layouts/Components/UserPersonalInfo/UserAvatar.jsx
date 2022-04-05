import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { ButtonStyle } from '../../../Components/Button';
import SelectAvatar from '../../../HOC/ModalContent/SelectAvatar';
import { ModalContext } from 'HOC/GlobalModalProvider';

import { currentUserAvatar } from '../../../store/selectors/userPersonalData';

const AvatarStyle = styled.div`
  padding: 10px;
  .image {
    vertical-align: middle;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
  .change {
    ${ButtonStyle}
    margin-top: 15px;
    font-size: 14px;
    padding: 3px;
    background-color: ${(props) => props.theme.appBackGroundColor};
    &:hover {
      color: ${(props) => props.theme.appBackGroundColor};
    }
  }
`;

const UserAvatar = ({ userId, button }) => {
  const defaultAvatarUrl =
    'https://winnote.ru/wp-content/uploads/2016/01/1454222417_del_recent_avatar1.png';
  const avatar = useSelector(currentUserAvatar);
  const image = avatar ? avatar.image : defaultAvatarUrl;

  const openModal = useContext(ModalContext);

  const openModalImageAvatar = () => {
    openModal(
      <SelectAvatar userId={userId} setModal={openModal} avatar={avatar} />
    );
  };

  return (
    <AvatarStyle>
      <img className={'image'} src={image} alt="" />
      {button ? (
        <button
          className={'change'}
          type="button"
          onClick={openModalImageAvatar}
        >
          Change image
        </button>
      ) : null}
    </AvatarStyle>
  );
};

export default UserAvatar;
