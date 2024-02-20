import React, { useEffect, useState } from 'react';
import CardsList from './CardsList';

function Quiz({ cards, setCards }) {
    const [quizCards, setQuizCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8181/cards/quizz')
            .then(response => response.json())
            .then(data => setQuizCards(data))
            .catch(error => console.error('Error fetching quiz cards:', error));
    }, [setCards]);

    const handleAnswer = (cardId, isCorrect) => {
    };

    return (
        <div>
            <h2>Quiz Time</h2>
            <CardsList cards={quizCards} onAnswer={handleAnswer} />
        </div>
    );
}

export default Quiz;
