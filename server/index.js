import { getPokemon } from './pokemon.js';
import {
  joinGame,
  player1SelectPokemon,
  player2SelectPokemon,
  isGameReady
} from './game.js';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
let game = { player1: null, player2: null };

const selectPokemon = {
  1: player1SelectPokemon,
  2: player2SelectPokemon
};

const playerFor = {
  1: () => game.player1,
  2: () => game.player2
};

app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/sandbox', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sandbox.html'));
});

app.get('/pokemon', (req, res) => {
  getPokemon().then(r => res.json(r));
});

app.post('/select-pokemon', (req, res) => {
  selectPokemon[req.body.playerId](game, req.body.pokemon);

  res.json({
    pokemon: playerFor[req.body.playerId]().pokemon
  });
});

app.get('/is-game-ready', (req, res) => {
  res.json({ isGameReady: isGameReady(game) });
});

app.post('/join', (req, res) => {
  const success = joinGame(game);
  if (success) {
    let player = { playerId: 1 };
    if (game.player2) player = { playerId: 2 };
    res.json(player);
  } else {
    res.status(400);
    res.send('no dice for you');
  }
});

app.get('/reset-game', (req, res) => {
  game = {};
  res.json(game);
});

app.get('/game', (req, res) => res.json(game));

app.listen(process.env.PORT || 3000);
console.log('Listening on port: ' + (process.env.PORT || 3000));
