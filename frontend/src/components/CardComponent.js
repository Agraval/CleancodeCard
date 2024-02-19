import React from 'react';

function CardComponent({ card, onAnswer }) {
    const handleAnswer = (isCorrect) => {
        onAnswer(card.id, isCorrect);
    };

    return (
        <div>
            <div>{card.question}</div>
            <button onClick={() => handleAnswer(true)}>Correct</button>
            <button onClick={() => handleAnswer(false)}>Incorrect</button>
        </div>
    );
}

export default CardComponent;
