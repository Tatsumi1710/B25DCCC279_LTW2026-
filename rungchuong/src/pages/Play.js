import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION, EXTRA_TIME } from '../data';
import { calcScore, getRank } from '../utils';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';
import Helpers from '../components/Helpers';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName, onSaveHistory }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  
  const [usedRemoveOne, setUsedRemoveOne] = useState(false);
  const [usedAddTime, setUsedAddTime] = useState(false);
  const [usedLifeline, setUsedLifeline] = useState(false);
  const [lifelineActive, setLifelineActive] = useState(false);
  const [hiddenIndex, setHiddenIndex] = useState(null);

  const currentQuestion = questions[currentIndex];
  const currentScore = calcScore(answers);

  
  useEffect(() => {
    if (!playerName.trim() || !currentQuestion) return;
    document.title = `Câu ${currentIndex + 1}/${questions.length} – ${currentScore} điểm`;

    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [currentIndex, currentScore, questions.length, playerName, currentQuestion]);


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
        const savedByLifeline = !isCorrect && lifelineActive;

        const newAnswer = {
          id: currentQuestion.id,
          level: currentQuestion.level,
          correct: isCorrect,
          usedLifeline: savedByLifeline,
        };
        const updatedAnswers = [...answers, newAnswer];

        const finishGame = (reason) => {
          const finalScore = calcScore(updatedAnswers);
          const finalRank = getRank(finalScore);
          const correctCount = updatedAnswers.filter((a) => a.correct).length;

          onSaveHistory({
            id: Date.now(),
            name: playerName.trim(),
            score: finalScore,
            rank: finalRank,
            correctCount,
            playedAt: new Date().toLocaleString('vi-VN'),
          });

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

        if (isCorrect || savedByLifeline) {
          if (currentIndex + 1 === questions.length) {
            const allCorrect = updatedAnswers.every((a) => a.correct);
            finishGame(allCorrect ? 'win' : 'completed');
          } else {
            setAnswers(updatedAnswers);
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setHiddenIndex(null);
            setLifelineActive(false);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          finishGame(selectedOption === null ? 'timeout' : 'wrong');
        }
      }, 1500);
    }

    return () => clearTimeout(timerId);
  }, [
    status,
    currentQuestion,
    selectedOption,
    lifelineActive,
    answers,
    currentIndex,
    questions.length,
    navigate,
    playerName,
    onSaveHistory,
  ]);

  
  useEffect(() => {
    if (!playerName.trim() || !currentQuestion) return;

    const handleKey = (e) => {
      if (status !== 'answering') return;
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (keyMap[e.key] !== undefined) {
        const idx = keyMap[e.key];
        if (idx === hiddenIndex) return; 
        setSelectedOption(idx);
        setStatus('locked');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [status, hiddenIndex, playerName, currentQuestion]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) return null;

  const handleSelectOption = (index) => {
    if (status !== 'answering' || index === hiddenIndex) return;
    setSelectedOption(index);
    setStatus('locked');
  };

  const handleRemoveOne = () => {
    if (status !== 'answering' || usedRemoveOne) return;
    const wrongIndices = [0, 1, 2, 3].filter(
      (idx) => idx !== currentQuestion.answer
    );
    const randomWrong =
      wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    setHiddenIndex(randomWrong);
    setUsedRemoveOne(true);
  };

  const handleAddTime = () => {
    if (status !== 'answering' || usedAddTime) return;
    setTimeLeft((prev) => prev + EXTRA_TIME);
    setUsedAddTime(true);
  };

  const handleUseLifeline = () => {
    if (status !== 'answering' || usedLifeline) return;
    setLifelineActive(true);
    setUsedLifeline(true);
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
      <Helpers
        usedRemoveOne={usedRemoveOne}
        usedAddTime={usedAddTime}
        usedLifeline={usedLifeline}
        lifelineActive={lifelineActive}
        disabled={status !== 'answering'}
        onRemoveOne={handleRemoveOne}
        onAddTime={handleAddTime}
        onUseLifeline={handleUseLifeline}
      />
      <QuestionCard
        questionItem={currentQuestion}
        currentIndex={currentIndex}
        total={questions.length}
        status={status}
        selectedOption={selectedOption}
        hiddenIndex={hiddenIndex}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
};

export default Play;