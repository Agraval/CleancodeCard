import React from 'react';
import { render, screen } from '@testing-library/react';
import CardForm from '../components/CardForm.js';

describe('CardForm', () => {
    it('renders a form with question, answer, and tags input fields', () => {
        render(<CardForm onAddCard={() => {}} />);
        expect(screen.getByLabelText(/Question/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Answer/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Tags/)).toBeInTheDocument();
    });
});
