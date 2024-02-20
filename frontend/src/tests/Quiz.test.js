import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Quiz from '../components/Quiz';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

describe('Quiz', () => {
    it('fetches and displays quiz cards', async () => {
        const quizCards = [
            { id: '1', question: "What is React?", answer: "A JavaScript library for building user interfaces", category: "FIRST" },
            { id: '2', question: "What is Jest?", answer: "A delightful JavaScript Testing Framework", category: "FIRST" }
        ];

        fetch.mockResponseOnce(JSON.stringify(quizCards));

        await act(async () => {
            render(<Quiz />);
        });

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByText(/What is React?/)).toBeInTheDocument();
        expect(screen.getByText(/What is Jest?/)).toBeInTheDocument();
    });
});
