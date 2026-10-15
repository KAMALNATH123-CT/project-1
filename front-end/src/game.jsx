
import React, { useState } from 'react';
import './game.css'; 

function Game() {
  const [fruits, setFruits] = useState(['?', '?', '?', '?']);
  const [target, setTarget] = useState('🍎');
  const [message, setMessage] = useState('Click "Start Match" to begin!');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hiddenAnswer, setHiddenAnswer] = useState(['🍌', '🍎', '🍇', '🍊']);
  function startGame() {
    const shuffledPool = ['🍌', '🍎', '🍇', '🍊'].sort(() => Math.random() - 0.5);
    const randomTarget = shuffledPool[Math.floor(Math.random() * shuffledPool.length)];
    setHiddenAnswer(shuffledPool);
    setTarget(randomTarget);
    setFruits(['?', '?', '?', '?']);
    setMessage(`Find the ${randomTarget}! 🔍`);
    setIsPlaying(true);
  }
  function clickCard(index) {
    if (!isPlaying || fruits[index] !== '?') return;
    const revealFruits = [...fruits];
    revealFruits[index] = hiddenAnswer[index];
    setFruits(revealFruits);
    if (hiddenAnswer[index] === target) {
      setMessage('You Won! 🎉');
      setIsPlaying(false);
    } else {
      setMessage('Not this one! Try another card... 🤔');
    }
  }
  
  return (
    <div className="game-container">
      <h1 className="game-title">4-Card Match</h1>
      <div className="target-badge">Target: {target}</div>
      <p className="status-message">{message}</p>
      <div className="card-grid">
        {fruits.map((item, index) => (
          <button 
          key={index} 
          onClick={() => clickCard(index)} 
          className={`card-button ${item !== '?' ? 'revealed' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={startGame} className="start-btn">
        Start Match
      </button>
    </div>
  );
}

export default Game;