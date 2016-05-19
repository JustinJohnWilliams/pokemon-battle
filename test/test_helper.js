import { joinGame, selectPokemon } from '../server/game.js';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

export function getIn(promise, f) {
  return promise.then((a, b, c, d, e) => {
    return new Promise(
      (resolve) => resolve(f(a, b, c, d, e))
    );
  });
}

export function equal(actual, expected, message) {
  return chai
    .expect(actual)
    .to.eventually.equal(expected, message);
}

export function deepEqual(actual, expected, message) {
  return chai
    .expect(actual)
    .to.eventually.deep.equal(expected, message);
}

export function makeGameReady() {
  const game = {};
  joinGame(game);
  joinGame(game);

  selectPokemon(game, '1', { name: 'staryu', url: 'http://pokeapi.co/api/v2/pokemon-species/120/' });
  selectPokemon(game, '1', { name: 'scyther', url: 'http://pokeapi.co/api/v2/pokemon-species/123/' });
  selectPokemon(game, '1', { name: 'pinsir', url: 'http://pokeapi.co/api/v2/pokemon-species/127/' });
  selectPokemon(game, '1', { name: 'tauros', url: 'http://pokeapi.co/api/v2/pokemon-species/128/' });
  selectPokemon(game, '1', { name: 'magikarp', url: 'http://pokeapi.co/api/v2/pokemon-species/129/' });

  selectPokemon(game, '2', { name: 'lickitung', url: 'http://pokeapi.co/api/v2/pokemon-species/108/' });
  selectPokemon(game, '2', { name: 'koffing', url: 'http://pokeapi.co/api/v2/pokemon-species/109/' });
  selectPokemon(game, '2', { name: 'ryhorn', url: 'http://pokeapi.co/api/v2/pokemon-species/111/' });
  selectPokemon(game, '2', { name: 'tangela', url: 'http://pokeapi.co/api/v2/pokemon-species/114/' });
  selectPokemon(game, '2', { name: 'kangaskhan', url: 'http://pokeapi.co/api/v2/pokemon-species/115/' });

  return game;
}
