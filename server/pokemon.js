import unirest from 'unirest';

function uri(path) {
  return `http://pokeapi.co/api/v2/${path}`;
}

function get(path, selectClause) {
  return new Promise((resolve) => {
    unirest
      .get(uri(path))
      .end(r => resolve(selectClause(r.body)));
  });
}

export function getPokemon() {
  return get(
    'generation/1',
    r => r.pokemon_species
  );
}
