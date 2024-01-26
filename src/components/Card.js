// Card.js
import React from 'react';

const Card = ({ imageUrl, name, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Card;
