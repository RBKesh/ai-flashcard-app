# 🧠 AI Flashcard App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.103-green)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)

An AI-powered flashcard application that turns your study notes into interactive flashcards automatically. Uses spaced repetition (SM-2 algorithm) to optimize your study sessions.

## 🌟 Features
- **AI Card Generation:** Paste your notes and instantly get Q&A pairs (uses OpenAI API or a local rule-based fallback).
- **Spaced Repetition:** Implements the proven SM-2 algorithm for efficient memorization.
- **Interactive Study Mode:** 3D flipping flashcards with self-rating buttons (Again, Hard, Good, Easy).
- **Dark Mode UI:** Sleek, modern design with purple and indigo accents.

## 🏗️ Architecture
```
[React Frontend] (Port 3000)
       |
     (API)
       v
[FastAPI Backend] (Port 8000)
    /     \
[SQLite]  [AI Generator (OpenAI/Rule-based)]
```

## 📸 Screenshots
*(Placeholder for UI screenshots)*

## 🚀 Quick Start
1. Clone the repository.
2. (Optional) Set your OpenAI API key in `docker-compose.yml` or a `.env` file.
3. Run `docker-compose up --build`
4. Visit `http://localhost:3000`

## 📚 API Reference
| Endpoint | Method | Description |
|---|---|---|
| `/api/decks` | GET | List all decks |
| `/api/decks` | POST | Create a new deck |
| `/api/generate-cards` | POST | Generate cards from text |
| `/api/decks/{id}/cards` | GET | Get cards in a deck |
| `/api/review/{card_id}` | POST | Submit SM-2 review rating |

## 🛠️ Tech Stack
- Frontend: React, React Router, Axios, CSS3
- Backend: FastAPI, SQLAlchemy, SQLite, OpenAI, Python 3.10
- DevOps: Docker, Docker Compose

## 📄 License
MIT License 2024 Rishi B (RBKesh)
