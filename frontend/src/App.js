// src/App.js
import React, { useState, useEffect } from 'react';
import CardForm from './components/CardForm';
import CardsList from './components/CardsList';
import './index.css';

function App() {
    const [cards, setCards] = useState([]);

    // Fetch cards for today's quiz
    useEffect(() => {
        // Assuming the backend server is running on localhost:8080 as per the Swagger file
        fetch('http://localhost:8181/cards/quizz')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    // Handle card creation
    const handleAddCard = (cardData) => {
        fetch('http://localhost:8181/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData),
        })
            .then(response => response.json())
            .then(addedCard => setCards([...cards, addedCard]))
            .catch(error => console.error('Error adding card:', error));
    };

    const handleAnswer = (cardId, isCorrect) => {
        fetch(`http://localhost:8181/cards/${cardId}/answer`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isValid: isCorrect }),
        })
            .then(() => {
                setCards(currentCards =>
                    currentCards.map(card =>
                        card.id === cardId ? { ...card, category: isCorrect ? 'NEXT_CATEGORY' : 'FIRST' } : card
                    )
                );
            })
            .catch(error => console.error('Error submitting answer:', error));
    };

    return (
        <div className="app-container">
            <h1>Learning Cards</h1>
            <CardForm onAddCard={handleAddCard} />
            <CardsList cards={cards} onAnswer={handleAnswer} />
        </div>
    );
}

export default App;
