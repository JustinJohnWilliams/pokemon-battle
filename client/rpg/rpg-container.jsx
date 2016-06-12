import { Component } from 'react';
import { bind } from 'lodash';
import { RpgView } from './rpg-view.jsx';
import {
  tickBattle,
  activeTurnThreshold,
  isBattleOver,
  attackBattling,
  captureBattling,
  pikachu,
  bulbasaur
} from './rpj.js';

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

  tickBattle() {
    if (this._isBattleOver()) return;

    this.tickBattleCore();
  }

  tickBattleCore() {
    this.setState(
      tickBattle(
        this.state.chosen,
        this.state.battling,
        this.state.team,
        this.state.playByPlay));

    setTimeout(bind(() => {
      this.tickBattle();
    }, this), 500);
  }

  findTrouble() {
    if (this.state.location == 'forest') {
      this.setState({
        chosen: pikachu(),
        battling: bulbasaur(),
        playByPlay: [`The throwdown has begun between ${pikachu().name} and ${bulbasaur().name}. Who will the bitch be?`]
      }, this.tickBattle);
    }
  }

  _isBattleOver() {
    return isBattleOver(
      this.state.chosen,
      this.state.battling);
  }

  _attackBattling() {
    this.setState(
      attackBattling(
        this.state.chosen,
        this.state.battling,
        this.state.playByPlay));
  }

  _captureBattling() {
    this.setState(
      captureBattling(
        this.state.chosen,
        this.state.battling,
        this.state.team,
        this.state.playByPlay), this.tickBattleCore);
  }


  render() {
    return (
      <RpgView
        location={this.state.location}
        battling={this.state.battling}
        changeLocation={this.changeLocation.bind(this)}
        goHome={this.goHome.bind(this)}
        findTrouble={this.findTrouble.bind(this)}
        attackBattling={this._attackBattling.bind(this)}
        isBattleOver={this._isBattleOver()}
        captureBattling={this._captureBattling.bind(this)}
        playByPlay={this.state.playByPlay}
        activeTurnThreshold={activeTurnThreshold()}
        chosen={this.state.chosen}
        team={this.state.team}
        askMommyForHelp={this.askMommyForHelp.bind(this)}
        momFeelsPity={this.state.momFeelsPity}
      />
    );
  }
}
