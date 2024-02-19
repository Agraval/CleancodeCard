import React from 'react';
import CardComponent from './CardComponent';

function CardsList({ cards, onAnswer }) {
    return (
        <div>
            {cards.map(card => (
                <CardComponent key={card.id} card={card} onAnswer={onAnswer} />
            ))}
        </div>
    );
}

export default CardsList;
