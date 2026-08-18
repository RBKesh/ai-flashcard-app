import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DeckView from './pages/DeckView';
import Study from './pages/Study';
import Import from './pages/Import';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-logo">AI Flashcards</Link>
          <div className="nav-links">
            <Link to="/">Decks</Link>
          </div>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck/:id" element={<DeckView />} />
            <Route path="/deck/:id/study" element={<Study />} />
            <Route path="/deck/:id/import" element={<Import />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
