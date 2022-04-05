import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  refreshUserAvatar,
  setNewUserAvatar,
} from '../../store/actions/userPersonalData';
import man from '../../assets/icons/man.png';
import man1 from '../../assets/icons/man1.png';
import woman from '../../assets/icons/woman.jpg';
import woman1 from '../../assets/icons/woman1.jpg';
import { Form, Formik } from 'formik';
import InputRadioImage from '../../Components/formikFields/InputradioImage';
import { currentUserAvatar } from '../../store/selectors/userPersonalData';
import { userIdSelector } from '../../store/selectors/user';
import { ButtonStyle } from '../../Components/Button';
const SelectAvatarStyle = styled.div`
  background-color: white;

  .wrapper_image {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
  }
  button {
    ${ButtonStyle}
    align-items: center;
    margin: 10px auto;
    margin-left: 45%;
  }
`;

const SelectAvatar = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const avatar = useSelector(currentUserAvatar);

  return (
    <SelectAvatarStyle>
      <Formik
        initialValues={{ image: avatar ? avatar.image : '' }}
        onSubmit={(formValues) => {
          avatar
            ? dispatch(refreshUserAvatar(formValues.image, avatar))
            : dispatch(setNewUserAvatar(formValues.image, userId));
          props.setModal(false);
        }}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form>
            <div className={'wrapper_image'}>
              <InputRadioImage
                name="image"
                value={woman}
                cheked={values.image}
              />
              <InputRadioImage name="image" value={man} cheked={values.image} />
              <InputRadioImage
                name="image"
                value={man1}
                cheked={values.image}
              />
              <InputRadioImage
                name="image"
                value={woman1}
                cheked={values.image}
              />
            </div>

            <button className="buttonSubmit">Submit</button>
          </Form>
        )}
      </Formik>
    </SelectAvatarStyle>
  );
};

export default SelectAvatar;
