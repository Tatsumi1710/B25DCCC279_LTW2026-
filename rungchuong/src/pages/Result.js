import React from 'react';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { name, score, rank, correctCount, reason } = state;

  const getHeading = () => {
    if (reason === 'win') return 'Chúc mừng! Bạn đã rung chuông vàng';
    if (reason === 'completed') return 'Bạn đã hoàn thành 15 câu';
    if (reason === 'timeout') return 'Hết giờ!';
    return 'Bạn đã bị loại';
  };

  return (
    <div>
      <h2>{getHeading()}</h2>
      <p>{`Người chơi: ${name}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}`}</p>
      <p>{`Điểm: ${score}`}</p>
      <p>{`Danh hiệu: ${rank}`}</p>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button className="btn" onClick={() => navigate('/play')}>
          Chơi lại
        </button>
        <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Result;