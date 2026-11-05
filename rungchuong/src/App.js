import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const STORAGE_KEY = 'ltw_rcv_history';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Đọc lịch sử từ localStorage lúc khởi tạo
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tải danh sách câu hỏi
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  // Tự động lưu history vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleSaveHistory = (record) => {
    setHistory((prev) => [...prev, record]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
              history={history}
            />
          }
        />
        <Route
          path="play"
          element={
            <Play
              questions={questions}
              playerName={playerName}
              onSaveHistory={handleSaveHistory}
            />
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={
            <History history={history} onClearHistory={handleClearHistory} />
          }
        />
        <Route
          path="questions"
          element={<QuestionBank questions={questions} />}
        />
        <Route
          path="questions/:id"
          element={<QuestionDetail questions={questions} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;