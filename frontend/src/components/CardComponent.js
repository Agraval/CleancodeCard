function CardComponent({ card, onAnswer }) {
    const handleAnswer = (isCorrect) => {
        onAnswer(card.id, isCorrect);
    };

    return (
        <div className="card">
            <div>Question: {card.question}</div>
            <div>Réponse: {card.answer}</div> {/* Afficher la réponse pourrait être optionnel selon les besoins de l'application */}
            <button onClick={() => handleAnswer(true)}>Correct</button>
            <button onClick={() => handleAnswer(false)}>Incorrect</button>
        </div>
    );
}

export default CardComponent;