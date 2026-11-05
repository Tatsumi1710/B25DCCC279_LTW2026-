import React from 'react';

const Helpers = ({
  usedRemoveOne,
  usedAddTime,
  usedLifeline,
  lifelineActive,
  disabled,
  onRemoveOne,
  onAddTime,
  onUseLifeline,
}) => {
  return (
    <div className="helpers">
      <button
        className="btn"
        disabled={disabled || usedRemoveOne}
        onClick={onRemoveOne}
      >
        Loại 1 đáp án
      </button>

      <button
        className="btn"
        disabled={disabled || usedAddTime}
        onClick={onAddTime}
      >
        Thêm 15 giây
      </button>

      <button
        className="btn"
        disabled={disabled || usedLifeline}
        onClick={onUseLifeline}
      >
        {lifelineActive ? 'Phao đang bật' : 'Phao cứu sinh'}
      </button>
    </div>
  );
};

export default Helpers;