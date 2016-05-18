import { equal, getIn, makeGameReady } from './test_helper.js';
import { getPokemon } from '../server/pokemon.js';
import { joinGame,
         selectPokemon,
         isGameReady } from '../server/game.js';

import assert from 'assert';

describe('gotta catch them all', () => {
  it('retrieving pokemon', () => {
    return equal(
      getIn(getPokemon(), r => r.length),
      151,
      'I didn\'t get 151 pokemon');
  });

  it('joining game', () => {
    const game = { };
    assert.equal(joinGame(game), true);
    assert.equal(joinGame(game), true);
    assert.equal(joinGame(game), false);
  });

  it('selecting pokemon', () => {
    const game = { };
    joinGame(game);
    joinGame(game);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '1', { name: 'pikachu2' });
    selectPokemon(game, '1', { name: 'pikachu3' });
    selectPokemon(game, '1', { name: 'pikachu4' });
    selectPokemon(game, '1', { name: 'pikachu5' });
    assert.equal(game['1'].pokemon.length, 5);

    selectPokemon(game, '1', { name: 'pikachu6' });
    assert.equal(game['1'].pokemon.length, 5);
  });

  it('game ready?', () => {
    const game = {};

    assert.equal(isGameReady(game), false);

    joinGame(game);
    assert.equal(isGameReady(game), false);

    joinGame(game);
    assert.equal(isGameReady(game), false);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '2', { name: 'pikachu' });
    assert.equal(isGameReady(game), false);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '2', { name: 'pikachu' });
    assert.equal(isGameReady(game), false);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '2', { name: 'pikachu' });
    assert.equal(isGameReady(game), false);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '2', { name: 'pikachu' });
    assert.equal(isGameReady(game), false);

    selectPokemon(game, '1', { name: 'pikachu' });
    selectPokemon(game, '2', { name: 'pikachu' });
    assert.equal(isGameReady(game), true);
  });

  it('select pokemon for battle', () => {
    const game = makeGameReady();


  });
});
