import { find } from 'lodash';

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

export function isReadyToBattle(game, player) {
  if (player) return !!((game[player] || { }).chosenForBattle);

  return isReadyToBattle(game, '1') && isReadyToBattle(game, '2');
}

export function choosePokemonForBattle(game, player, pokemon) {
  game[player].chosenForBattle = pokemon;
}

export function findPokemon(game, player, pokemonId) {
  return find(game[player].pokemon, { url: pokemonId });
}

export function attack(game, from, to) {
  game[to].chosenForBattle.hp = game[to].chosenForBattle.hp || 100;
  game[from].chosenForBattle.attackPower = game[from].chosenForBattle.attackPower || 10;

  game[to].chosenForBattle.hp -= game[from].chosenForBattle.attackPower;
}

export function gameState(game) {
  return {
    isGameReady: isGameReady(game),
    currentTurn: 1,
    chosenForBattle: {
      1: (game['1'] || { }).chosenForBattle,
      2: (game['2'] || { }).chosenForBattle
    },
    isReadyForBattle: isReadyToBattle(game),
    isPlayerReadyForBattle: {
      1: isReadyToBattle(game, '1'),
      2: isReadyToBattle(game, '2')
    }
  };
}
