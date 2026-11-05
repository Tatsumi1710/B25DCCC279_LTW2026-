import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const currentQuestion = questions[currentIndex];
  const currentScore = calcScore(answers);

  // Đồng hồ đếm lùi
  useEffect(() => {
    if (!playerName.trim() || !currentQuestion || status !== 'answering') return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setSelectedOption(null);
          setStatus('revealed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, currentIndex, playerName, currentQuestion]);

  // Điều phối chuyển trạng thái locked -> revealed -> next / end
  useEffect(() => {
    if (!playerName.trim() || !currentQuestion) return;

    let timerId;
    if (status === 'locked') {
      timerId = setTimeout(() => {
        setStatus('revealed');
      }, 2000);
    } else if (status === 'revealed') {
      timerId = setTimeout(() => {
        const isCorrect =
          selectedOption !== null && selectedOption === currentQuestion.answer;
        const newAnswer = {
          id: currentQuestion.id,
          level: currentQuestion.level,
          correct: isCorrect,
        };
        const updatedAnswers = [...answers, newAnswer];

        const finishGame = (reason) => {
          const finalScore = calcScore(updatedAnswers);
          const finalRank = getRank(finalScore);
          const correctCount = updatedAnswers.filter((a) => a.correct).length;

          navigate('/result', {
            replace: true,
            state: {
              name: playerName.trim(),
              score: finalScore,
              rank: finalRank,
              correctCount,
              reason,
            },
          });
        };

        if (isCorrect) {
          if (currentIndex + 1 === questions.length) {
            finishGame('win');
          } else {
            setAnswers(updatedAnswers);
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          finishGame(selectedOption === null ? 'timeout' : 'wrong');
        }
      }, 1500);
    }

    return () => clearTimeout(timerId);
  }, [status, currentQuestion, selectedOption, answers, currentIndex, questions.length, navigate, playerName]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) return null;

  const handleSelectOption = (index) => {
    if (status !== 'answering') return;
    setSelectedOption(index);
    setStatus('locked');
  };

  return (
    <div>
      <ScoreBoard
        score={currentScore}
        currentIndex={currentIndex}
        answers={answers}
        total={questions.length}
      />
      <Timer timeLeft={timeLeft} />
      <QuestionCard
        questionItem={currentQuestion}
        currentIndex={currentIndex}
        total={questions.length}
        status={status}
        selectedOption={selectedOption}
        hiddenIndex={null}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
};

export default Play;