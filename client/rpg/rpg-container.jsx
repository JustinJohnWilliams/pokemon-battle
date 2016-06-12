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
    this.state = this.loadGame();
  }

  changeLocation(newLocation) {
    this.setState({
      location: newLocation,
      momFeelsPity: false
    }, this.saveGame);
  }

  saveGame() {
    localStorage.setItem('game', JSON.stringify(this.state));
  }

  loadGame() {
    const savedGame = localStorage.getItem('game');

    if (!savedGame) return this.newGame();

    else return JSON.parse(savedGame);
  }

  newGame() {
    return {
      location: 'home',
      momFeelsPity: false,
      team: [],
      playByPlay: [],
      inventory: []
    };
  }

  askMommyForHelp(something) {
    this.setState({
      team: this.state.team.concat('Pikachu'),
      momFeelsPity: true
    }, this.saveGame);
  }

  goHome() {
    this.changeLocation('home');
  }

  tickBattle() {
    if (this._isBattleOver()) {
      this.saveGame();
      return;
    }

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
    }, this), 250);
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
        this.state.playByPlay), this.saveGame);
  }

  _captureBattling() {
    const currentInventoryCount = this.state.inventory.count;

    const result = captureBattling(
      this.state.chosen,
      this.state.battling,
      this.state.inventory,
      this.state.playByPlay);

    if (currentInventoryCount != result.inventory.count) {
      this.setState(result, bind(() => {
        this.tickBattleCore();
        this.saveGame();
      }, this));
    } else {
      this.setState(result, this.saveGame);
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
        attackBattling={this._attackBattling.bind(this)}
        isBattleOver={this._isBattleOver()}
        captureBattling={this._captureBattling.bind(this)}
        playByPlay={this.state.playByPlay}
        activeTurnThreshold={activeTurnThreshold()}
        chosen={this.state.chosen}
        team={this.state.team}
        inventory={this.state.inventory}
        askMommyForHelp={this.askMommyForHelp.bind(this)}
        momFeelsPity={this.state.momFeelsPity}
      />
    );
  }
}
