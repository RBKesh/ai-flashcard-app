import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Import() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    try {
      await axios.post('/api/generate-cards', { text, deck_id: parseInt(id) });
      navigate(`/deck/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cards");
    }
    setLoading(false);
  };

  return (
    <div className="import-page">
      <h1>Generate Cards with AI</h1>
      <p>Paste your study notes below, and our AI will automatically generate flashcards for you.</p>
      <textarea 
        rows="10" 
        placeholder="Paste notes here..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={handleImport} className="btn btn-primary" disabled={loading || !text}>
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>
    </div>
  );
}
