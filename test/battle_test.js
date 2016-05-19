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
      '1',
      first(game['1'].pokemon));

    choosePokemonForBattle(
      game,
      '2',
      first(game['2'].pokemon));

    attack(game, '1', '2');

    assert(game['2'].chosenForBattle.hp, 90);

    attack(game, '1', '2');

    assert(game['2'].chosenForBattle.hp, 80);
  });
});
