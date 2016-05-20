//fswatch test/battle_test.js | xargs -n1 -I{} npm test

import { equal, getIn, makeGameReady } from './test_helper.js';
import { getPokemonList } from '../server/api.js';
import { joinGame,
         isReadyToBattle,
         choosePokemonForBattle,
         selectPokemon,
         findPokemon,
         attack,
         isGameReady } from '../server/game.js';

import { first } from 'lodash';

import assert from 'assert';

describe('damage', () => {
  specify('player 1 attacks player 2', () => {
    const game = makeGameReady();

    choosePokemonForBattle(
      game,
      '1', {
        url: 'http://bulbasaur',
        name: 'bulbasaur',
        hp: 45,
        speed: 45,
        attack: 49,
        defense: 49
      });

    choosePokemonForBattle(
      game,
      '2', {
        url: 'http://lickitung',
        name: 'lickitung',
        hp: 45,
        speed: 45,
        attack: 49,
        defense: 49
      });

    attack(game, '1', '2');

    assert.equal(game['2'].chosenForBattle.hp, 43);

    attack(game, '1', '2');

    assert.equal(game['2'].chosenForBattle.hp, 41);
  });
});
