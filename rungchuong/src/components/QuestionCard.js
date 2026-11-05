import React from 'react';
import { LEVELS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  questionItem,
  currentIndex,
  total,
  status,
  selectedOption,
  hiddenIndex,
  onSelectOption,
}) => {
  return (
    <div className="question-card">
      <h3>{`Câu ${currentIndex + 1}/${total} – ${questionItem.topic} – ${LEVELS[questionItem.level]}`}</h3>
      <p>{questionItem.question}</p>
      <div className="answer-grid">
        {questionItem.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            option={opt}
            status={status}
            selectedOption={selectedOption}
            correctAnswer={questionItem.answer}
            isHidden={hiddenIndex === idx}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;