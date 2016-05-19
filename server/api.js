import { get } from './cachedRequest.js';

export function getPokemonList(limit) {
  limit = limit || 151;
  return get(`pokemon/?limit=${limit}`, r => r.results);
}

export function getPokemonMoves(url) {
  return get(url, r => r.moves);
}
