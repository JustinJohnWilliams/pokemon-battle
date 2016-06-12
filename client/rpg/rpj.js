import { get, remove } from 'lodash';

function emptyPokemon() {
  return {
    hp: 0,
    captured: false
  };
}

export function pikachu() {
  return {
    name: 'Pikachu',
    actionText: 'It be yellin\' "Pika fuck you, bitch!"',
    speed: 90,
    hp: 50,
    at: 0
  };
}

export function bulbasaur() {
  return {
    name: 'Bulbasaur',
    actionText: 'It comes a rushing. Whipping vines and shit.',
    speed: 45,
    hp: 50,
    at: 0
  };
}

function tickPokemon(pokemon) {
  if (!pokemon.canAttack) pokemon.at += pokemon.speed;

  if (pokemon.at >= activeTurnThreshold()) {
    pokemon.canAttack = true;
  } else {
    pokemon.canAttack = false;
  }

  return pokemon;
}

export function activeTurnThreshold() {
  return 1800;
}
export function tickBattle(chosen, battling, team, playByPlay) {
  chosen = tickPokemon(chosen);
  battling = tickPokemon(battling);

  if (battling.canAttack) {
    chosen.hp -= 10;
    battling.at -= activeTurnThreshold();
    battling.canAttack = false;
    playByPlay = playByPlay.concat(`${battling.name} attacks ${chosen.name} for 10.`);

    if (chosen.hp <= 0) {
      playByPlay = playByPlay.concat(`${chosen.name} has fallen. Mauled and bloody. Pokeguts everywhere.`);
      team = remove(team, chosen);
    }
  }

  return {
    chosen,
    battling,
    team,
    playByPlay
  };
}

export function isBattleOver(chosen, battling) {
  chosen = chosen || emptyPokemon();
  battling = battling || emptyPokemon();

  if (chosen.hp <= 0 ||
      battling.hp <= 0 ||
      battling.captured == true) return true;

  return false;
}

export function attackBattling(chosen, battling, playByPlay) {
  battling.hp -= 10;
  chosen.at -= activeTurnThreshold();
  playByPlay = playByPlay.concat(`${chosen.name} attacks ${battling.name} for 10.`);

  if (battling.hp <= 0) {
    playByPlay = playByPlay.concat(`${battling.name} has fallen. Mauled and bloody. Poke-guts everywhere.`);
  }

  return {
    battling,
    chosen,
    playByPlay
  };
}

export function captureBattling(chosen, battling, team, playByPlay) {
  const percent = 1.0 - (battling.hp / 50);
  team = team.concat(battling.name);
  chosen.at -= activeTurnThreshold();

  if (Math.random(1) < percent) {
    battling.captured = true;

    return {
      team,
      chosen,
      playByPlay: playByPlay.concat(`${battling.name} succumbs to your ball.`)
    };
  }

  return {
    team,
    chosen,
    playByPlay: playByPlay.concat(`Your ball hits ${battling.name} in the head, but is batted away. Too stronk.`)
  };
}
