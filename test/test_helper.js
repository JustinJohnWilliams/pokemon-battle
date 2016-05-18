import { joinGame, player1SelectPokemon, player2SelectPokemon } from '../server/game.js';
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

export function makeGameReady() {
  const game = {};
  joinGame(game);
  joinGame(game);

  player1SelectPokemon(game, { name: 'staryu', url: 'http://pokeapi.co/api/v2/pokemon-species/120/' });
  player1SelectPokemon(game, { name: 'scyther', url: 'http://pokeapi.co/api/v2/pokemon-species/123/' });
  player1SelectPokemon(game, { name: 'pinsir', url: 'http://pokeapi.co/api/v2/pokemon-species/127/' });
  player1SelectPokemon(game, { name: 'tauros', url: 'http://pokeapi.co/api/v2/pokemon-species/128/' });
  player1SelectPokemon(game, { name: 'magikarp', url: 'http://pokeapi.co/api/v2/pokemon-species/129/' });

  player2SelectPokemon(game, { name: 'lickitung', url: 'http://pokeapi.co/api/v2/pokemon-species/108/' });
  player2SelectPokemon(game, { name: 'koffing', url: 'http://pokeapi.co/api/v2/pokemon-species/109/' });
  player2SelectPokemon(game, { name: 'ryhorn', url: 'http://pokeapi.co/api/v2/pokemon-species/111/' });
  player2SelectPokemon(game, { name: 'tangela', url: 'http://pokeapi.co/api/v2/pokemon-species/114/' });
  player2SelectPokemon(game, { name: 'kangaskhan', url: 'http://pokeapi.co/api/v2/pokemon-species/115/' });

  return game;
}
