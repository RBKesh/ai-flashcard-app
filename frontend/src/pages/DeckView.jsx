import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function DeckView() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/api/decks/${id}/cards`).then(res => setCards(res.data));
  }, [id]);

  return (
    <div className="deck-view">
      <div className="deck-header">
        <h1>Deck Cards</h1>
        <div className="actions">
          <Link to={`/deck/${id}/import`} className="btn btn-secondary">Import Notes</Link>
          <Link to={`/deck/${id}/study`} className="btn btn-primary">Study Deck</Link>
        </div>
      </div>
      <div className="card-list">
        {cards.map(card => (
          <div key={card.id} className="simple-card">
            <strong>Q:</strong> {card.front} <br/>
            <strong>A:</strong> {card.back}
          </div>
        ))}
        {cards.length === 0 && <p>No cards yet. Import some notes to generate cards!</p>}
      </div>
    </div>
  );
}
