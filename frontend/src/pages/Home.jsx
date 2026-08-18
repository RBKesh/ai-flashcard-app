import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeckCard from '../components/DeckCard';

export default function Home() {
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');

  const fetchDecks = () => {
    axios.get('/api/decks').then(res => setDecks(res.data));
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const createDeck = (e) => {
    e.preventDefault();
    if (!newDeckName) return;
    axios.post('/api/decks', { name: newDeckName }).then(() => {
      setNewDeckName('');
      fetchDecks();
    });
  };

  return (
    <div className="home-page">
      <h1>Your Decks</h1>
      <form onSubmit={createDeck} className="create-deck-form">
        <input 
          type="text" 
          placeholder="New Deck Name..." 
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Create Deck</button>
      </form>
      <div className="deck-list">
        {decks.map(deck => <DeckCard key={deck.id} deck={deck} />)}
      </div>
    </div>
  );
}
