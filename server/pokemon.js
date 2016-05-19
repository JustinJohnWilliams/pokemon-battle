import { get } from './cachedRequest.js';

export function getPokemonList() {
  return get('pokemon/?limit=151', r => r.results);
}

export function getPokemonMoves(url) {
  return get(url, r => r.moves);
}
