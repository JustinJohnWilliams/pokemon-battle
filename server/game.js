export function joinGame(game) {
  if (!game['1']) {
    game['1'] = { };
    return true;
  } else if (!game['2']) {
    game['2'] = { };
    return true;
  }
  return false;
}

export function selectPokemon(game, player, pokemon) {
  game[player].pokemon = game[player].pokemon || [];
  if (game[player].pokemon.length == 5) return;
  game[player].pokemon = game[player].pokemon.concat(pokemon);
}


export function isGameReady(game) {
  if (!game['1']) return false;
  if (!game['2']) return false;

  if (!game['1'].pokemon) return false;
  if (!game['2'].pokemon) return false;

  if (game['1'].pokemon.length != 5) return false;
  if (game['2'].pokemon.length != 5) return false;

  return true;
}
