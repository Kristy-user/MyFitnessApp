import React from 'react';

export const MyContainer = ({ children }) => {
  return (
    <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
      <CalendarContainer>
        <div style={{ background: '#f0f0f0' }}>What is your favorite day?</div>
        <div style={{ position: 'relative' }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};
