import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({
  index,
  option,
  status,
  selectedOption,
  correctAnswer,
  isHidden,
  onSelect,
}) => {
  if (isHidden) {
    return <button className="answer-btn hidden-opt" disabled />;
  }

  let btnClass = 'answer-btn';
  if (status === 'locked' && selectedOption === index) {
    btnClass = `${btnClass} locked`;
  } else if (status === 'revealed') {
    if (index === correctAnswer) {
      btnClass = `${btnClass} correct`;
    } else if (selectedOption === index && selectedOption !== correctAnswer) {
      btnClass = `${btnClass} wrong`;
    }
  }

  return (
    <button
      className={btnClass}
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
    >
      {`${LETTERS[index]}. ${option}`}
    </button>
  );
};

export default AnswerButton;