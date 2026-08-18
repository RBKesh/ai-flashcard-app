import React, { useState } from 'react';

export default function FlashCard({ front, back, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip();
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{front}</p>
        </div>
        <div className="flashcard-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
}
