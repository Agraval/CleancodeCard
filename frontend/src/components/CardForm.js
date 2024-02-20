import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function CardForm({ onAddCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/cards')
            .then(response => response.json())
            .then(setCards)
            .catch(error => console.error('Error fetching cards:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const cardData = { question, answer, tags: tags.split(',').map(tag => tag.trim()) };

        fetch('http://localhost:8080/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData),
        })
            .then(response => response.json())
            .then(newCard => {
                setCards(prevCards => [...prevCards, newCard]);
                setQuestion('');
                setAnswer('');
                setTags('');
            })
            .catch(error => console.error('Error adding card:', error));
    };

    return (
        <Paper sx={{ p: 4, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>Add New Card</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Answer"
                            variant="outlined"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tags (comma separated)"
                            variant="outlined"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Add Card</Button>
                    </Grid>
                </Grid>
            </form>
            <Typography variant="h6" sx={{ mt: 4 }}>Existing Cards</Typography>
            <List>
                {cards.map((card, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={card.question}
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            Answer:
                                        </Typography>
                                        {` ${card.answer}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}

export default CardForm;
