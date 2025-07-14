import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [player, setPlayer] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const fetchLeaderboard = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL || 'http://18.211.223.6:3001/api/leaderboard');
    const data = await res.json();
    setLeaderboard(data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!player || !guess) {
      setMessage('Please enter your name and a guess!');
      return;
    }
    const res = await fetch(process.env.REACT_APP_API_URL || 'http://18.211.223.6:3001/api/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, guess })
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.correct) setGameOver(true);
    fetchLeaderboard();
    setGuess('');
  };

  return (
    <div className="App">
      <h1>Number Guessing Game</h1>
      <p>Guess a number between 1 to 100!</p>
      {!gameOver ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            disabled={gameOver}
          />
          <input
            type="number"
            placeholder="Your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
          />
          <button type="submit" disabled={gameOver}>Submit Guess</button>
        </form>
      ) : (
        <p>Congratulations! You've won!</p>
      )}
      <p>{message}</p>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Guess</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.player}</td>
              <td>{entry.guess}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
