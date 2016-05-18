import { getPokemon } from './pokemon.js';
import {
  joinGame,
  selectPokemon,
  isGameReady,
  findPokemon,
  choosePokemonForBattle,
  isReadyToBattle
} from './game.js';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
let game = {};

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
  selectPokemon(game, req.body.playerId, req.body.pokemon);

  res.json({
    pokemon: game[req.body.playerId].pokemon
  });
});

app.post('/choose-pokemon-for-battle', (req, res) => {
  const pokemon = findPokemon(
    game,
    req.body.playerId,
    req.body.pokemonId);

  choosePokemonForBattle(
    game,
    req.body.playerId,
    pokemon);

  res.json({ pokemon });
});

app.get('/game-state', (req, res) => {
  res.json({
    isGameReady: isGameReady(game),
    currentTurn: 1,
    currentPokemon: {
      1: null,
      2: null
    },
    isReadyForBattle: isReadyToBattle(game),
    isPlayerReadyForBattle: {
      1: isReadyToBattle(game, '1'),
      2: isReadyToBattle(game, '2')
    }
  });
});

app.post('/join', (req, res) => {
  const success = joinGame(game);
  if (success) {
    let player = { playerId: 1 };
    if (game['2']) player = { playerId: 2 };
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
