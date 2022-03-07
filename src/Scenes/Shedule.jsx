import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { CardStyle } from '../Components/CardTemplate';

const StyledCalendar = styled.div`
  padding: 30px;
  box-shadow: 0 5px 30px 0 ${(props) => props.theme.cardBackgroundColor};
`;

export const Shedule = () => {
  const [value, onChange] = useState(new Date());
  const [task, setTask] = useState('');
  const [displayClasses, setDisplayClasses] = useState(false);

  return (
    <StyledCalendar>
      <Calendar
        // onChange={onChange}
        // value={value}
        onClickDay={(value, event) => alert('Clicked day: ', value)}
      />
      <br />
      <ul>
        {value.valueOf() === 1581548400000 &&
          classes.map((cl) => {
            return <li key={cl.id}>{cl.name}</li>;
          })}
      </ul>
    </StyledCalendar>
  );
};
