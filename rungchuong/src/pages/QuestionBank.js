import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

const QuestionBank = ({ questions }) => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchText, setSearchText] = useState('');


  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchSearch = q.question.toLowerCase().includes(searchText.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filter-bar">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="All">Tất cả</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm theo nội dung câu hỏi..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <p>{`Có ${filteredQuestions.length} câu hỏi`}</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.topic}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;