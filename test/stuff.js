//fswatch test/stuff.js | xargs -n1 -I{} npm test

import { equal, getIn, makeGameReady } from './test_helper.js';
import { getPokemonList } from '../server/pokemon.js';
import { joinGame,
         isReadyToBattle,
         choosePokemonForBattle,
         selectPokemon,
         findPokemon,
         isGameReady } from '../server/game.js';

import { first } from 'lodash';

import assert from 'assert';

describe('gotta catch them all', () => {
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

  it('find pokemon', () => {
    const game = makeGameReady();

    assert.equal(
      game['1'].pokemon[0],
      findPokemon(game, '1', game['1'].pokemon[0].url));
  });

  it('select pokemon for battle', () => {
    assert.equal(isReadyToBattle({}), false);
    const game = makeGameReady();

    assert.equal(isReadyToBattle(game), false);

    choosePokemonForBattle(
      game,
      '1',
      first(game['1'].pokemon));

    assert.equal(isReadyToBattle(game, '1'), true);

    assert.equal(isReadyToBattle(game, '2'), false);

    assert.equal(isReadyToBattle(game), false);

    choosePokemonForBattle(
      game,
      '2',
      first(game['2'].pokemon));

    assert.equal(isReadyToBattle(game), true);

    assert.equal(isReadyToBattle(game, '2'), true);
  });
});
