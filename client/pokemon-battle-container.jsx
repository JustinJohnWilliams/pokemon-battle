import { Component } from 'react';
import { bind, find, sortBy } from 'lodash';
import req from 'reqwest';
import { SelectPokemonView } from './select-pokemon-view.jsx';
import { InitGameView } from './init-game-view.jsx';

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
  }

  getPokemon() {
    req({
      url: '/pokemon',
      method: 'get',
      success: bind((r) => {
        this.setState({ pokemon: sortBy(r, ['name']) });
      }, this)
    });
  }

  selectForBattle(id) {
    const selected = find(this.state.pokemon, { url: id });
    this.setState({
      selectedForBattle: this.state.selectedForBattle.concat(selected)
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
    if (this.state.playerId == null) return (<InitGameView joinGame={this.joinGame.bind(this)} />);

    return (
      <SelectPokemonView
        playerId={this.state.playerId}
        pokemon={this.state.pokemon}
        selectForBattle={this.selectForBattle.bind(this)}
        selectedForBattle={this.state.selectedForBattle}
      />
    );
  }
}
