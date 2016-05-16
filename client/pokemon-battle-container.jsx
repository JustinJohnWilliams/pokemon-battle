import { Component } from 'react';
import req from 'reqwest';
import { bind, map, find, sortBy } from 'lodash';

class SelectPokemonView extends Component {

  renderPokemon() {
    return map(this.props.pokemon, p => {
      return (
        <PokemonLink
           name={p.name}
           id={p.url}
           key={p.url}
           selected={this.props.selectForBattle}
        />);
    });
  }

  renderSelectedForBattle() {
    return map(this.props.selectedForBattle, p => {
      return (
        <PokemonLink
           name={p.name}
           id={p.url}
           key={p.url}
           />);
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderPokemon()}
        </div>
        <hr />
        <div>
          {this.renderSelectedForBattle()}
        </div>
      </div>
    );
  }
}

class InitGameView extends Component {
  render() {
    return (
      <div>
        <a href='javascript:alert("joined game!");'>Join Game</a>
      </div>
    );
  }
}

class PokemonLink extends Component {
  onClick() {
    console.log(this.props.id);
    this.props.selected(this.props.id);
  }

  render() {
    return (
      <div>
        <a href='javascript:;' onClick={this.onClick.bind(this)}>{this.props.name}</a>
      </div>
    );
  }
}

class PokemonBattleContainer extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [ ],
      selectedForBattle: [ ],
      playerId: null,
      game: { }
    };
  }

  componentDidMount() {
    req({
      url: '/pokemon',
      method: 'get',
      success: bind((r) => {
        this.setState({ pokemon: sortBy(r, ["name"])});
      }, this)
    });
  }

  selectForBattle(id) {
    let selected = find(this.state.pokemon, { url: id });
    this.setState({
      selectedForBattle: this.state.selectedForBattle.concat(selected)
    });
  }

  joinGame() {

  }

  render() {
    if(this.state.playerId == null) return (<InitGameView joinGame={this.joinGame.bind(this)} />);
    return (
      <SelectPokemonView
         pokemon={this.state.pokemon}
         selectForBattle={this.selectForBattle.bind(this)}
         selectedForBattle={this.state.selectedForBattle} />
    );
  }

}

function initApp() {
  ReactDOM.render(
    <PokemonBattleContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
