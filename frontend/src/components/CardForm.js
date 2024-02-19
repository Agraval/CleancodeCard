import React, { useState } from 'react';

function CardForm({ onAddCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddCard(question, answer, tags.split(',').map(tag => tag.trim()));
        setQuestion('');
        setAnswer('');
        setTags('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question" required />
            <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer" required />
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
            <button type="submit">Add Card</button>
        </form>
    );
}

export default CardForm;

