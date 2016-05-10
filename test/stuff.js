import { equal, getIn } from './test_helper.js';
import { getPokemon } from '../server/pokemon.js';
import { joinGame,
         player1SelectPokemon,
         player2SelectPokemon,
         isGameReady } from '../server/game.js';

import assert from 'assert';

describe('gotta catch them all', () => {
	xit('retrieving pokemon', () => {
    return equal(
      getIn(getPokemon(), r => r.length),
      151,
      'I didn\'t get 151 pokemon');
  });

  it('joining game', () => {
    let game = { };
    assert.equal(joinGame(game), true);
    assert.equal(joinGame(game), true);
    assert.equal(joinGame(game), false);
  });

  it('selecting pokemon', () => {
    let game = { };
    joinGame(game);
    joinGame(game);

    player1SelectPokemon(game, {name: 'pikachu'});
    player1SelectPokemon(game, {name: 'pikachu2'});
    player1SelectPokemon(game, {name: 'pikachu3'});
    player1SelectPokemon(game, {name: 'pikachu4'});
    player1SelectPokemon(game, {name: 'pikachu5'});
    assert.equal(game.player1.pokemon.length, 5);

    player1SelectPokemon(game, {name: 'pikachu6'});
    assert.equal(game.player1.pokemon.length, 5);
  });

  it('game ready?', () => {
    let game = {};

    assert.equal(isGameReady(game), false);

    joinGame(game);
    assert.equal(isGameReady(game), false);

    joinGame(game);
    assert.equal(isGameReady(game), false);

    player1SelectPokemon(game, {name: 'pikachu'});
    player2SelectPokemon(game, {name: 'pikachu'});
    assert.equal(isGameReady(game), false);

    player1SelectPokemon(game, {name: 'pikachu'});
    player2SelectPokemon(game, {name: 'pikachu'});
    assert.equal(isGameReady(game), false);

    player1SelectPokemon(game, {name: 'pikachu'});
    player2SelectPokemon(game, {name: 'pikachu'});
    assert.equal(isGameReady(game), false);

    player1SelectPokemon(game, {name: 'pikachu'});
    player2SelectPokemon(game, {name: 'pikachu'});
    assert.equal(isGameReady(game), false);

    player1SelectPokemon(game, {name: 'pikachu'});
    player2SelectPokemon(game, {name: 'pikachu'});
    assert.equal(isGameReady(game), true);
  });
});
