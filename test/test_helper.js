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

  selectPokemon(game, '1', { url: 'http://bulbasaur', name: 'bulbasaur', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '1', { url: 'http://scyther', name: 'scyther', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '1', { url: 'http://pinsir', name: 'pinsir', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '1', { url: 'http://tauros', name: 'tauros', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '1', { url: 'http://magikarp', name: 'magikarp', hp: 45, speed: 45, attack: 49, defense: 49 });

  selectPokemon(game, '2', { url: 'http://lickitung', name: 'lickitung', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '2', { url: 'http://koffing', name: 'koffing', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '2', { url: 'http://ryhorn', name: 'ryhorn', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '2', { url: 'http://tangela', name: 'tangela', hp: 45, speed: 45, attack: 49, defense: 49 });
  selectPokemon(game, '2', { url: 'http://kangaskhan', name: 'kangaskhan', hp: 45, speed: 45, attack: 49, defense: 49 });

  return game;
}
