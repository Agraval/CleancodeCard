import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders App component with navigation links', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Vérifie que le texte "Learning Cards" est présent dans l'AppBar
  expect(screen.getByText('Learning Cards')).toBeInTheDocument();

  // Vérifie que les liens "Add Card" et "Quiz" sont présents dans l'AppBar
  expect(screen.getByText(/add card/i).closest('a')).toBeInTheDocument();
  expect(screen.getByText(/quiz/i).closest('a')).toBeInTheDocument();
});


