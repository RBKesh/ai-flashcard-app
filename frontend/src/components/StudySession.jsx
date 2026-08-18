import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';

export default function StudySession({ deckId }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRatings, setShowRatings] = useState(false);

  useEffect(() => {
    axios.get(`/api/decks/${deckId}/cards`).then(res => setCards(res.data));
  }, [deckId]);

  if (cards.length === 0) return <div>No cards to study!</div>;
  if (currentIndex >= cards.length) return <div className="study-complete"><h2>Study Session Complete! 🎉</h2></div>;

  const handleRate = async (quality) => {
    await axios.post(`/api/review/${cards[currentIndex].id}`, { quality });
    setShowRatings(false);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="study-session">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentIndex / cards.length) * 100}%` }}></div>
      </div>
      <p className="progress-text">{currentIndex + 1} / {cards.length}</p>
      
      <FlashCard 
        front={cards[currentIndex].front} 
        back={cards[currentIndex].back} 
        onFlip={() => setShowRatings(true)} 
      />

      {showRatings && (
        <div className="rating-buttons">
          <button onClick={() => handleRate(1)} className="btn btn-danger">Again (1)</button>
          <button onClick={() => handleRate(3)} className="btn btn-warning">Hard (3)</button>
          <button onClick={() => handleRate(4)} className="btn btn-info">Good (4)</button>
          <button onClick={() => handleRate(5)} className="btn btn-success">Easy (5)</button>
        </div>
      )}
    </div>
  );
}
