// import React, { useState, useContext } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import fakeServerAPI from '../../api/fakeServerAPI';
// import FormikInputNumber from '../../Components/formikFields/FormikInputNumber';
// import { EditUserGoals } from '../../store/actions/goals';
// import { userIdSelector } from '../../store/selectors/user';

// const StyledCard = styled.div`
//   background-color: #fff;
//   border: 1px solid red;
//   /* align-self: center; */
//   text-align: center;
//   width: 100%;
//   height: 100%;

//   margin: 20px auto;

//   .cardButton {
//     margin: 20px auto;
//   }
//   .cardHeader {
//     height: 20%;
//     /* width: ${(props) => props.percentDone}%; */
//     background-color: ${(props) => props.theme.buttonColor};

//     /* &:hover {
//       background-color: aquamarine;
//     } */
//   }
// `;

// const EditCard = (props) => {
//   const [value, setValue] = useState('');
//   const dispatch = useDispatch();
//   const userId = useSelector(userIdSelector);
//   return (
//     <StyledCard>
//       <div className={'cardHeader'}>Previous value: {props.name}</div>
//       <input
//         type="text"
//         placeholder="new value"
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <div className={'cardBody'}>Are you sure?</div>
//       <div className={'cardFooter'}></div>
//       <div className={'cardFooter'}>
//         <button
//           onClick={
//             () => {}
//             // fakeServerAPI.put(`/dataGoals`, {
//             //   userId[props.name] = value            })
//           }
//         >
//           ok
//         </button>
//         <button onClick={() => props.setModal(false)}>Cancel</button>
//       </div>
//     </StyledCard>
//   );
// };

// export default EditCard;

/* <input onChange={handleNewCardNameInput} value={newCardName} /> */
