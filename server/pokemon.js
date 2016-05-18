import { get } from './cachedRequest.js';

export function getPokemon() {
  return get('generation/1', r => r.pokemon_species);
}

export function getPokemonMoves(url) {
  return get(url, r => r.moves);
}
