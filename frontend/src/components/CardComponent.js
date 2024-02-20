import React, { useState } from 'react';

function CardComponent({ card, onForceValidation }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const handleAnswerSubmission = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
        submitAnswer(isCorrect);
    };

    const submitAnswer = (isCorrect) => {
        fetch(`http://localhost:8181/cards/${card.id}/answer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isValid: isCorrect }),
        })
            .then(() => {
                if (!isCorrect) {
                    setShowCorrectAnswer(true); // Show the correct answer if wrong
                } else {
                    setShowCorrectAnswer(false); // Reset to hide the correct answer if the user's answer is right
                    onForceValidation(card.id, true); // Update the card status as validated
                }
                setUserAnswer(''); // Reset the user answer for the next interaction
            })
            .catch(error => {
                console.error('Error submitting answer:', error);
                alert('There was an error submitting your answer. Please try again.');
            });
    };

    const handleForceValidation = () => {
        submitAnswer(true); // Force the answer to be correct regardless of the user's input
    };

    return (
        <div className="card">
            <div>Question: {card.question}</div>
            {showCorrectAnswer && (
                <>
                    <div>Your Answer: {userAnswer}</div>
                    <div>Correct Answer: {card.answer}</div>
                </>
            )}
            {!showCorrectAnswer && (
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your answer"
                />
            )}
            <button onClick={handleAnswerSubmission} disabled={showCorrectAnswer}>Submit Answer</button>
            <button onClick={handleForceValidation} disabled={!showCorrectAnswer}>Force Validate</button>
        </div>
    );
}

export default CardComponent;
