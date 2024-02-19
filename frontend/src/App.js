import React, { useState, useEffect } from 'react';
import CardForm from './components/CardForm';
import CardsList from './components/CardsList';

function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8181/api/cards')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    const handleAddCard = (question, answer, tags) => {
        const newCard = { question, answer, tags };
        fetch('http://localhost:8181/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        })
            .then(response => response.json())
            .then(addedCard => setCards([...cards, addedCard]))
            .catch(error => console.error('Error adding card:', error));
    };

    const handleAnswer = (cardId, isCorrect) => {
        fetch(`http://localhost:8181/api/cards/${cardId}/answer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
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
        <div>
            <h1>Learning Cards</h1>
            <CardForm onAddCard={handleAddCard} />
            <CardsList cards={cards} onAnswer={handleAnswer} />
        </div>
    );
}

export default App;