import { equal, getIn } from './test_helper.js';
import { getPokemon } from '../server/pokemon.js';

describe('gotta catch them all', () => {
	it('works', () => {
    return equal(
      getIn(getPokemon(), r => r.length),
      151,
      'I didn\'t get 151 pokemon');
  });
});
