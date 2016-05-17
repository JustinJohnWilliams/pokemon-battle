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
      selectedForBattle: [],
      playerId: null,
      game: { }
    };
  }

  componentDidMount() {
    this.getPokemon();
    this.poll();
  }

  poll() {
    req({
      url: '/is-game-ready',
      method: 'get',
      success: bind(r => {
        this.setState({ isGameReady: r.isGameReady });
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
      data: { pokemon: selected, playerId: this.state.playerId },
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
    this.setState({ playerId: r.playerId });
  }

  render() {
    if (this.state.isGameReady) {
      return <BattleArenaView />;
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
