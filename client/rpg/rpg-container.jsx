import { Component } from 'react';
import { bind, get, map } from 'lodash';

export class RpgContainer extends Component {
  constructor() {
    super();
    this.state = {
      location: 'home',
      team: ['Pikachu'],
      playByPlay: []
    };
  }

  changeLocation(newLocation) {
    this.setState({ location: newLocation });
  }

  goHome() {
    this.changeLocation('home');
  }

  tickPokemon(pokemon) {
    if (!pokemon.canAttack) pokemon.at += pokemon.speed;

    if (pokemon.at >= 1800) {
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

    if (battling.canAttack) {
      chosen.hp -= 10;
      battling.at -= 1800;
      battling.canAttack = false;
      playByPlay = playByPlay.concat(`${this.state.battling.name} attacks ${this.state.chosen.name} for 10.`);
    }

    this.setState({
      chosen: chosen,
      battling: battling,
      playByPlay
    });

    setTimeout(bind(() => {
      this.tickBattle();
    }, this), 500);
  }

  attackBattling() {
    const battling = this.state.battling;
    battling.hp -= 10;

    const chosen = this.state.chosen;
    chosen.at -= 1800;

    this.setState({
      battling,
      chosen,
      playByPlay: this.state.playByPlay.concat(`${this.state.chosen.name} attacks ${this.state.battling.name} for 10.`)
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
    const percent = 1.0 - (this.state.battling.hp / 50);
    const team = this.state.team.concat(this.state.battling.name);

    if (Math.random(1) < percent) {
      battling.captured = true;

      this.setState({
        team,
        playByPlay: this.state.playByPlay.concat(`${battling.name} succumbs to your ball.`)
      }, this.tickBattleCore());
    } else {
      this.setState({
        team,
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
        chosen={this.state.chosen}
      />
    );
  }
}
