import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    navigate('/play');
  };

  return (
    <div>
      <h1>Rung chuông vàng</h1>
      <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>• Trả lời lần lượt 15 câu hỏi trắc nghiệm về HTML, CSS, JavaScript và React.</p>
        <p>• Mỗi câu có 20 giây (Dễ: 10đ, Trung bình: 20đ, Khó: 30đ).</p>
        <p>• Trả lời sai hoặc hết giờ sẽ bị loại ngay.</p>
        <p>• Vượt qua cả 15 câu để rung chuông vàng (300 điểm)</p>
      </div>

      <form onSubmit={handleStart}>
        <input
          type="text"
          className="input-text"
          placeholder="Nhập tên người chơi..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />{' '}
        <button type="submit" className="btn" disabled={!playerName.trim()}>
          Vào thi
        </button>
      </form>
    </div>
  );
};

export default Home;