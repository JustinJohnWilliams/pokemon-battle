import { get } from './cachedRequest.js';
import { find } from 'lodash';

export function getPokemonList(limit) {
  limit = limit || 151;
  return get(`pokemon/?limit=${limit}`, r => r.results);
}

function stat(pokemonFromApi, stat) {
  return find(
    pokemonFromApi.stats,
    s => s.stat.name == stat
  ).base_stat;
}

function pokemonProjection(pokemonFromApi) {
  return {
    name: pokemonFromApi.name,
    hp: stat(pokemonFromApi, 'hp'),
    speed: stat(pokemonFromApi, 'speed'),
    attack: stat(pokemonFromApi, 'attack'),
    defense: stat(pokemonFromApi, 'defense')
  };
}

export function getPokemon(url) {
  return get(url, pokemonProjection);
}

export function getPokemonMoves(url) {
  return get(url, r => r.moves);
}
