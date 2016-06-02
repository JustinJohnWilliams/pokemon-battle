import { Component } from 'react';
import { bind, get, remove } from 'lodash';
import { RpgView } from './rpg-view.jsx';

export class RpgContainer extends Component {
  constructor() {
    super();
    this.state = {
      location: 'home',
      momFeelsPity: false,
      team: [],
      playByPlay: []
    };
  }

  changeLocation(newLocation) {
    this.setState({
      location: newLocation,
      momFeelsPity: false
    });
  }

  askMommyForHelp(something) {
    this.setState({
      team: this.state.team.concat('Pikachu'),
      momFeelsPity: true
    });
  }

  goHome() {
    this.changeLocation('home');
  }

  activeTurnThreshold() {
    return 1800;
  }

  tickPokemon(pokemon) {
    if (!pokemon.canAttack) pokemon.at += pokemon.speed;

    if (pokemon.at >= this.activeTurnThreshold()) {
      pokemon.canAttack = true;
    } else {
      pokemon.canAttack = false;
    }

    return pokemon;
  }

  tickBattle() {
    if (this.isGameOver()) return;

    this.tickBattleCore();
  }

  tickBattleCore() {
    const chosen = this.tickPokemon(this.state.chosen);
    const battling = this.tickPokemon(this.state.battling);
    let playByPlay = this.state.playByPlay;
    let team = this.state.team;

    if (battling.canAttack) {
      chosen.hp -= 10;
      battling.at -= this.activeTurnThreshold();
      battling.canAttack = false;
      playByPlay = playByPlay.concat(`${this.state.battling.name} attacks ${this.state.chosen.name} for 10.`);

      if (chosen.hp <= 0) {
        playByPlay = playByPlay.concat(`${this.state.chosen.name} has fallen. Mauled and bloody. Poke-guts everywhere.`);
        team = remove(team, this.state.chosen);
      }
    }

    this.setState({
      chosen: chosen,
      battling: battling,
      playByPlay,
      team
    });

    setTimeout(bind(() => {
      this.tickBattle();
    }, this), 500);
  }

  attackBattling() {
    const battling = this.state.battling;
    battling.hp -= 10;

    const chosen = this.state.chosen;
    chosen.at -= this.activeTurnThreshold();

    let playByPlay = this.state.playByPlay.concat(`${this.state.chosen.name} attacks ${this.state.battling.name} for 10.`);

    if (battling.hp <= 0) {
      playByPlay = playByPlay.concat(`${this.state.battling.name} has fallen. Mauled and bloody. Poke-guts everywhere.`);
    }

    this.setState({
      battling,
      chosen,
      playByPlay
    });
  }

  findTrouble() {
    if (this.state.location == 'forest') {
      this.setState({
        chosen: {
          name: 'Pikachu',
          actionText: 'It be yellin\' "Pika fuck you, bitch!"',
          speed: 90,
          hp: 50,
          at: 0
        },
        battling: {
          name: 'Bulbasaur',
          actionText: 'It comes a rushing. Whipping vines and shit.',
          speed: 45,
          hp: 50,
          at: 0
        },
        playByPlay: ['The throwdown has begun between Pikachu and Bulbasaur. Who will the bitch be?']
      }, this.tickBattle);
    }
  }

  isGameOver() {
    if (get(this.state, 'chosen.hp', 0) <= 0 ||
        get(this.state, 'battling.hp', 0) <= 0 ||
        get(this.state, 'battling.captured', false) == true) return true;

    return false;
  }

  captureBattling() {
    const battling = this.state.battling;
    const chosen = this.state.chosen;
    const percent = 1.0 - (this.state.battling.hp / 50);
    let team = this.state.team;
    chosen.at -= this.activeTurnThreshold();

    if (Math.random(1) < percent) {
      battling.captured = true;
      team = team.concat(this.state.battling.name);

      this.setState({
        team,
        chosen,
        playByPlay: this.state.playByPlay.concat(`${battling.name} succumbs to your ball.`)
      }, this.tickBattleCore());
    } else {
      this.setState({
        team,
        chosen,
        playByPlay: this.state.playByPlay.concat(`Your ball hits ${battling.name} in the head, but is batted away. Too stronk.`)
      }, this.tickBattleCore());
    }
  }


  render() {
    return (
      <RpgView
        location={this.state.location}
        battling={this.state.battling}
        changeLocation={this.changeLocation.bind(this)}
        goHome={this.goHome.bind(this)}
        findTrouble={this.findTrouble.bind(this)}
        attackBattling={this.attackBattling.bind(this)}
        isGameOver={this.isGameOver()}
        captureBattling={this.captureBattling.bind(this)}
        playByPlay={this.state.playByPlay}
        activeTurnThreshold={this.activeTurnThreshold()}
        chosen={this.state.chosen}
        team={this.state.team}
        askMommyForHelp={this.askMommyForHelp.bind(this)}
        momFeelsPity={this.state.momFeelsPity}
      />
    );
  }
}
