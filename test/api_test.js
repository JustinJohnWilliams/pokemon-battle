//fswatch test/api_test.js | xargs -n1 -I{} npm test

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

describe('le api', () => {
  specify('retrieving 151 pokemon', () => {
    return equal(
      getIn(getPokemonList(), r => r.length),
      151,
      'I didn\'t get 151 pokemon');
  });

  specify('retriving a single pokemon', () => {
  });
});
