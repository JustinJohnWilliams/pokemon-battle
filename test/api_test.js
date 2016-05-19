//fswatch test/api_test.js | xargs -n1 -I{} npm test

import { equal, getIn, deepEqual } from './test_helper.js';
import { getPokemonList, getPokemon } from '../server/api.js';
import { first } from 'lodash';

describe('le api', () => {
  specify('retrieving 151 pokemon', () => {
    return equal(
      getIn(getPokemonList(), r => r.length),
      151,
      'I didn\'t get 151 pokemon');
  });

  specify('retrieving a single pokemon (list)', () => {
    return equal(
      getIn(getPokemonList(1), r => r.length),
      1,
      'I didn\'t get a single pokemon');
  });

  specify('retriving a single pokemon (detail)', () => {
    const pokemon = getPokemonList(1).then(r => getPokemon(first(r).url));

    return deepEqual(
      pokemon, {
        name: 'bulbasaur',
        hp: 45,
        speed: 45,
        attack: 49,
        defense: 49
      });
  });
});
