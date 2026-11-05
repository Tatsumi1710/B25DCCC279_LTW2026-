import React from 'react';

const ScoreBoard = ({ score, currentIndex, answers, total = 15 }) => {
  const boxes = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="scoreboard">
      <div>{`Điểm: ${score}`}</div>
      <div className="score-boxes">
        {boxes.map((idx) => {
          const ans = answers[idx];
          let statusClass = '';
          if (ans) {
            if (ans.correct) {
              statusClass = 'correct';
            } else if (ans.usedLifeline) {
              statusClass = 'lifeline';
            }
          } else if (idx === currentIndex) {
            statusClass = 'current';
          }

          return (
            <div key={idx + 1} className={`score-box ${statusClass}`}>
              {idx + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;