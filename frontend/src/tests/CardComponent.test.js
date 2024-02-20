import React from 'react';
import { render, screen } from '@testing-library/react';
import CardComponent from '../components/CardComponent';

describe('CardComponent', () => {
    const card = {
        id: '1',
        question: 'What is React?',
        answer: 'A JavaScript library for building user interfaces',
    };

    it('renders the question', () => {
        render(<CardComponent card={card} />);
        expect(screen.getByText(/What is React?/)).toBeInTheDocument();
    });

    it('provides an input for the user answer', () => {
        render(<CardComponent card={card} />);
        expect(screen.getByLabelText(/Your Answer/)).toBeInTheDocument();
    });
});
