import React from 'react';
import { useParams } from 'react-router-dom';
import StudySession from '../components/StudySession';

export default function Study() {
  const { id } = useParams();

  return (
    <div className="study-page">
      <h1>Study Time</h1>
      <StudySession deckId={id} />
    </div>
  );
}
