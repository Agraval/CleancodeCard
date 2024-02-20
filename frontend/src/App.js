import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CardForm from './components/CardForm';
import Quiz from './components/Quiz';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Learning Cards
                    </Typography>
                    <Button color="inherit" component={Link} to="/add-card">Add Card</Button>
                    <Button color="inherit" component={Link} to="/quiz">Quiz</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Switch>
                    <Route path="/add-card">
                        <CardForm />
                    </Route>
                    <Route path="/quiz">
                        <Quiz />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
