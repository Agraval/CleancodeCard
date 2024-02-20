import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

function CardComponent({ card }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [answerSubmitted, setAnswerSubmitted] = useState(false); 
    const handleAnswerSubmission = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
        if (isCorrect) {
            callAnswer(true, "Correct answer!" )
        } else {
            setShowCorrectAnswer(true);
        }
        setAnswerSubmitted(true);
    };

    const handleForceValidation = () => {
        callAnswer(true, "Answer forced validated!" )       
    };

    const handleConfirm = () => {
        callAnswer(false, "Incorrect answer" )       
    };
    
    const callAnswer = (isValidValue, message) =>{
        fetch(`http://localhost:8080/cards/${card.id}/answer`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isValid: isValidValue }),
        })
            .then(() => {
                alert(message);
                setShowCorrectAnswer(false);
            })
            .catch(error => console.error('Error submitting answer:', error));
    }

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Question: {card.question}
                </Typography>
                <TextField
                    fullWidth
                    label="Your Answer"
                    variant="outlined"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    margin="normal"
                />
                {showCorrectAnswer && (
                    <Typography sx={{ color: 'red', marginTop: 2 }}>
                        Correct Answer: {card.answer}
                    </Typography>
                )}
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item>
                        {!answerSubmitted && ( 
                            <Button variant="contained" onClick={handleAnswerSubmission}>
                                Submit Answer
                            </Button>
                        )}
                    </Grid>
                    {showCorrectAnswer && (
                        <Grid item>
                            <Button variant="outlined" onClick={handleConfirm}>
                                Confirm
                            </Button>
                            <Button variant="outlined" onClick={handleForceValidation}>
                                Force Validate
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CardComponent;
