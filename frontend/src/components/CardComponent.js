import React from 'react';

function CardComponent({ card, onAnswer }) {
    const handleAnswer = (isCorrect) => {
        onAnswer(card.id, isCorrect);
    };

    return (
        <div className="card">
            <div>Question: {card.question}</div>
            <div>Answer: {card.answer}</div>
            <button onClick={() => handleAnswer(true)}>Correct</button>
            <button onClick={() => handleAnswer(false)}>Incorrect</button>
        </div>
    );
}

export default CardComponent;