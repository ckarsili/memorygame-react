// Game.js
import React, { useState, useEffect } from 'react';
import shuffle from 'shuffle-array';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=8');
        const data = await response.json();
        const pokemonCards = data.results.map((pokemon, index) => ({
          id: index + 1,
          imageUrl: `https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`,
          name: pokemon.name,
        }));
        setCards(pokemonCards);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleCardClick = cardId => {
    const clickedCard = cards.find(card => card.id === cardId);

    if (clickedCard.clicked) {
      setCurrentScore(0);
      setCards(cards.map(card => ({ ...card, clicked: false })));
    } else {
      setCurrentScore(currentScore + 1);
      setBestScore(Math.max(currentScore + 1, bestScore));

      const updatedCards = cards.map(card =>
        card.id === cardId ? { ...card, clicked: true } : card
      );

      setCards(shuffle(updatedCards));
    }
  };

  return (
    <div className="game-container">
      <div className="scoreboard">
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div className="cards-container">
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
            <img src={card.imageUrl} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
