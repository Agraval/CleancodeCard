    import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
    import CardForm from './components/CardForm';
    import Quiz from './components/Quiz';
    import './index.css';

    function App() {
        const [cards, setCards] = useState([]);

        const handleAddCard = (cardData) => {
            fetch('http://localhost:8181/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cardData),
            })
                .then(response => response.json())
                .then(addedCard => setCards([...cards, addedCard]))
                .catch(error => console.error('Error adding card:', error));
        };
        const handleCardUpdate = (cardId, isCorrect) => {
            setCards(currentCards =>
                currentCards.map(card =>
                    card.id === cardId
                        ? { ...card, category: isCorrect ? 'NEXT_CATEGORY' : 'FIRST' }
                        : card
                )
            );
        };

        return (
            <Router>
                <div className="app-container">
                    <h1>Learning Cards</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/add-card">Add Card</Link>
                            </li>
                            <li>
                                <Link to="/quiz">Start Quiz</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/add-card">
                            <CardForm onAddCard={handleAddCard} />
                        </Route>
                        <Route path="/quiz">
                            <Quiz cards={cards} setCards={setCards} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

    export default App;
