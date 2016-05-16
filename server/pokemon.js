import { get } from './cachedRequest.js';

export function getPokemon() {
  return get('generation/1', r => r.pokemon_species);
}
