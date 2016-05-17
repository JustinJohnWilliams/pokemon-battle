export function joinGame(game) {
  if (!game.player1) {
    game.player1 = { };
    return true;
  } else if (!game.player2) {
    game.player2 = { };
    return true;
  }
  return false;
}

function selectPokemon(game, player, pokemon) {
  game[player].pokemon = game[player].pokemon || [];
  if (game[player].pokemon.length == 5) return;
  game[player].pokemon = game[player].pokemon.concat(pokemon);
}

export function player1SelectPokemon(game, pokemon) {
  selectPokemon(game, 'player1', pokemon);
}

export function player2SelectPokemon(game, pokemon) {
  selectPokemon(game, 'player2', pokemon);
}

export function isGameReady(game) {
  if (!game.player1) return false;
  if (!game.player2) return false;

  if (!game.player1.pokemon) return false;
  if (!game.player2.pokemon) return false;

  if (game.player1.pokemon.length != 5) return false;
  if (game.player2.pokemon.length != 5) return false;

  return true;
}
