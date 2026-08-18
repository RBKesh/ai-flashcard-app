import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from . import models, database, ai_generator, spaced_repetition

app = FastAPI(title="AI Flashcard App")

# Create tables
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

class GenerateRequest(BaseModel):
    text: str
    deck_id: int

class DeckCreate(BaseModel):
    name: str

class ReviewRequest(BaseModel):
    quality: int  # 0-5

@app.post("/api/generate-cards")
def generate_cards(req: GenerateRequest, db: Session = Depends(get_db)):
    deck = db.query(models.Deck).filter(models.Deck.id == req.deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    
    qa_pairs = ai_generator.generate_qa_pairs(req.text)
    cards = []
    for q, a in qa_pairs:
        card = models.Card(deck_id=deck.id, front=q, back=a)
        db.add(card)
        cards.append(card)
    db.commit()
    return {"message": f"Generated {len(cards)} cards", "cards": [{"id": c.id, "front": c.front} for c in cards]}

@app.get("/api/decks")
def get_decks(db: Session = Depends(get_db)):
    return db.query(models.Deck).all()

@app.post("/api/decks")
def create_deck(deck: DeckCreate, db: Session = Depends(get_db)):
    new_deck = models.Deck(name=deck.name)
    db.add(new_deck)
    db.commit()
    db.refresh(new_deck)
    return new_deck

@app.get("/api/decks/{deck_id}/cards")
def get_cards(deck_id: int, db: Session = Depends(get_db)):
    return db.query(models.Card).filter(models.Card.deck_id == deck_id).all()

@app.post("/api/review/{card_id}")
def review_card(card_id: int, req: ReviewRequest, db: Session = Depends(get_db)):
    card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    new_interval, new_reps, new_ef = spaced_repetition.sm2_review(
        req.quality, card.interval, card.repetitions, card.ease_factor
    )
    
    card.interval = new_interval
    card.repetitions = new_reps
    card.ease_factor = new_ef
    db.commit()
    return {"message": "Reviewed", "card": card}
