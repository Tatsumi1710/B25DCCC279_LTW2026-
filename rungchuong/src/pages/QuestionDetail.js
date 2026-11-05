import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionId = Number(id);
  const questionItem = questions.find((q) => q.id === questionId);

  if (!questionItem) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Quay lại 
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>{`Câu hỏi số ${questionItem.id} – ${questionItem.topic} (${LEVELS[questionItem.level]}, ${POINTS[questionItem.level]} điểm)`}</h2>
      <p>{questionItem.question}</p>

      <div>
        {questionItem.options.map((option, idx) => {
          const isCorrect = idx === questionItem.answer;
          return (
            <div
              key={LETTERS[idx]}
              className={`option-item ${isCorrect ? 'option-correct' : ''}`}
            >
              {`${LETTERS[idx]}. ${option}${isCorrect ? ' (Đáp án đúng)' : ''}`}
            </div>
          );
        })}
      </div>

      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default QuestionDetail;