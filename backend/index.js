const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://admin:password@mongo:27017/game?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const GuessSchema = new mongoose.Schema({
  player: String,
  guess: Number,
  timestamp: { type: Date, default: Date.now }
});
const Guess = mongoose.model('Guess', GuessSchema);

const secretNumber = Math.floor(Math.random() * 100) + 1;

app.post('/api/guess', async (req, res) => {
  const { player, guess } = req.body;
  if (!player || !guess) return res.status(400).json({ error: 'Player name and guess required' });
  const guessNum = parseInt(guess);
  await Guess.create({ player, guess: guessNum });
  if (guessNum === secretNumber) {
    return res.json({ message: 'Correct! You guessed the number!', correct: true });
  }
  const message = guessNum > secretNumber ? 'Too high!' : 'Too low!';
  res.json({ message, correct: false });
});

app.get('/api/leaderboard', async (req, res) => {
  const guesses = await Guess.find().sort({ timestamp: -1 });
  res.json(guesses);
});

app.listen(3001, () => console.log('Backend running on port 3001'));