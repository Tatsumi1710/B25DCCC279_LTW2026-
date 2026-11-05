import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div className={`timer ${timeLeft <= 5 ? 'danger' : ''}`}>
      {`Còn ${timeLeft} giây`}
    </div>
  );
};

export default Timer;