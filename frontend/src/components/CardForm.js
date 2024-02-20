import React, { useState, useEffect } from 'react';
import CardsList from './CardsList';

function CardForm({ onAddCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8181/cards')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    const handleAddCard = (cardData) => {
        fetch('http://localhost:8181/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData),
        })
            .then(response => response.json())
            .then(addedCard => {
                // Refresh the card list after adding a new card
                setCards([...cards, addedCard]);
            })
            .catch(error => console.error('Error adding card:', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const cardData = {
            question,
            answer,
            tags: tags.split(',').map(tag => tag.trim()),
        };

        onAddCard(cardData);
        setQuestion('');
        setAnswer('');
        setTags('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question"
                    required
                />
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Answer"
                    required
                />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma-separated)"
                />
                <button type="submit">Add Card</button>
            </form>
            <CardsList cards={cards} />
        </>
    );
}

export default CardForm;
