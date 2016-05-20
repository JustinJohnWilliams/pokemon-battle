import { Component } from 'react';
import { bind, find, sortBy } from 'lodash';
import req from 'reqwest';
import { SelectPokemonView } from './select-pokemon-view.jsx';
import { InitGameView } from './init-game-view.jsx';
import { BattleArenaView } from './battle-arena-view.jsx';

export class PokemonBattleContainer extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      chosenForBattle: null,
      opponentChosenForBattle: null,
      playerId: null,
      opponentPlayerId: null,
      game: { }
    };
  }

  componentDidMount() {
    this.getPokemon();
    this.poll();
  }

  poll() {
    req({
      url: '/game-state',
      method: 'get',
      success: bind(r => {
        this.setState({
          isGameReady: r.isGameReady,
          currentTurn: parseInt(r.currentTurn) == parseInt(this.state.playerId),
          chosenForBattle: r.chosenForBattle[this.state.playerId],
          opponentChosenForBattle: r.chosenForBattle[this.state.opponentPlayerId]
        });
        setTimeout(bind(() => this.poll(), this), 1000);
      }, this)
    });
  }

  getPokemon() {
    req({
      url: '/pokemon',
      method: 'get',
      success: bind(r => {
        this.setState({ pokemon: sortBy(r, ['name']) });
      }, this)
    });
  }

  selectForBattle(id) {
    const selected = find(this.state.pokemon, { url: id });

    req({
      url: '/select-pokemon',
      method: 'post',
      data: { pokemonId: selected, playerId: this.state.playerId },
      success: bind(r => {
        this.setState({
          selectedForBattle: r.pokemon
        });
      }, this)
    });
  }

  joinGame() {
    req({
      url: '/join',
      method: 'post',
      success: this.assignPlayer.bind(this)
    });
  }

  assignPlayer(r) {
    const other = { 1: 2, 2: 1 };
    this.setState({
      playerId: r.playerId,
      opponentPlayerId: other[r.playerId]
    });
  }

  choosePokemonForBattle(id) {
    req({
      url: '/choose-pokemon-for-battle',
      method: 'post',
      data: { playerId: this.state.playerId, pokemonId: id }
    });
  }

  attack() {
    req({
      url: '/attack',
      method: 'post',
      data: {
        playerId: this.state.playerId,
        opponentPlayerId: this.state.opponentPlayerId
      }
    });
  }

  render() {
    if (this.state.isGameReady) {
      return (
        <BattleArenaView
          currentTurn={this.state.currentTurn}
          chosenForBattle={this.state.chosenForBattle}
          opponentChosenForBattle={this.state.opponentChosenForBattle}
          selectedForBattle={this.state.selectedForBattle}
          choosePokemonForBattle={this.choosePokemonForBattle.bind(this)}
          attack={this.attack.bind(this)}
        />
      );
    }

    if (this.state.playerId) {
      return (
        <SelectPokemonView
          playerId={this.state.playerId}
          pokemon={this.state.pokemon}
          selectForBattle={this.selectForBattle.bind(this)}
          selectedForBattle={this.state.selectedForBattle}
        />
      );
    }

    return <InitGameView joinGame={this.joinGame.bind(this)} />;
  }
}
