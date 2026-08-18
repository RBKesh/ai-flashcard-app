import React from 'react';
import { Link } from 'react-router-dom';

export default function DeckCard({ deck }) {
  return (
    <div className="deck-card">
      <h2>{deck.name}</h2>
      <div className="deck-actions">
        <Link to={`/deck/${deck.id}`} className="btn btn-secondary">View Cards</Link>
        <Link to={`/deck/${deck.id}/study`} className="btn btn-primary">Study Now</Link>
      </div>
    </div>
  );
}
