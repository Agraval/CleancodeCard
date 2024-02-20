import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { Typography, Container } from '@mui/material';

function Quiz() {
    const [quizCards, setQuizCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8181/cards/quizz')
            .then(response => response.json())
            .then(setQuizCards)
            .catch(error => console.error('Error fetching quiz cards:', error));
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Quiz Time</Typography>
            {quizCards.map(card => (
                <CardComponent key={card.id} card={card} />
            ))}
        </Container>
    );
}

export default Quiz;
