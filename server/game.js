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
  game[from].chosenForBattle.attack = game[from].chosenForBattle.attack || 10;

  game[to].chosenForBattle.hp -= calculateAttackDamage(
    game[from].chosenForBattle,
    game[to].chosenForBattle);
}

function trueDamage(pokemon) {
  const level = 1;
  return (2 * level + 10) / 250;
}

function armourModification(fromPokemon, toPokemon) {
  return fromPokemon.attack / toPokemon.defense;
}

function baseAbilityPower() {
  //todo
  return 1;
}

function calculateAttackDamage(fromPokemon, toPokemon) {
  //http://bulbapedia.bulbagarden.net/wiki/Damage
  //Damage formula
  //
  //The damage dealt when a Pokemon uses a damaging move depends on its Attack or Special Attack stat
  //the opponent's corresponding Defense or Special Defense stat, and the move's base power.
  //In addition, the various factors of damage modification will also affect the damage dealt.
  //The damage formula is:
  //True Damage = (2 * [level] + 10 / 250)
  //Armour Modification = [from pokemon attack power] / [to pokemon defense power]
  //Damage = ([True Damage] * [Armour Modification] * [Base Ability Power] + 2) * [Modifer]
  //where
  //Level is the level of the attacking Pokemon.
  //Attack and Defense are the working Attack and Defense stats of the attacking
  //and defending Pokemon, respectively. If the attack is Special, the Special Attack and Special Defense stats are used instead. Some moves like Psystrike use stats other than what moves of this category would usually use (in case of Psystrike, it uses Special Attack and Defense).
  //Base is the base power of the attack.
  //and Modifier is
  //Modifier = STAB * Type * Critical * other * random(0.85, 1)
  //where
  //STAB is the same-type attack bonus. This is equal to 1.5 if the attack is of the same type as the user, and 1 if otherwise.
  //Type is the type effectiveness. This can be either 0, 0.25, 0.5, 1, 2, or 4 depending on the type of attack and the type of the defending Pokemon.
  //Critical is 2 for a critical hit in Generations I-V, 1.5 for a critical hit in Generation VI, and 1 otherwise.
  //other counts for things like held items, Abilities, field advantages, and whether the battle is a Double Battle or Triple Battle or not.
  //random is a random number from 0.85 to 1.00.
  //The result is rounded down as remainders are not kept. It is possible to do zero damage [1].
  return Math.round(
    trueDamage(fromPokemon) *
    armourModification(fromPokemon, toPokemon) *
    baseAbilityPower() + 2);
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
