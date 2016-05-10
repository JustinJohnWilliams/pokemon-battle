import { Component } from 'react';
import req from 'reqwest';
import { bind, map } from 'lodash';

class PokemonLink extends Component {
  onClick() {
    this.props.selectForBattle(this.props.id);
  }

  render() {
    return <div><a onClick={this.onClick.bind(this)}>{this.props.name}</a></div>;
  }
}

class PokemonBattleContainer extends Component {
  constructor() {
    super();
    this.state = { pokemon: [ ], selectedForBattle: [] };
  }

  componentDidMount() {
    req({
      url: '/pokemon',
      method: 'get',
      success: bind((r) => {
        console.log(r);
        this.setState({ pokemon: r });
      }, this)
    });
  }

  selectForBattle(id) {
    this.setState({ selectForBattle: this.state.selectedForBattle.concat(id) });
  }

  renderPokemon() {
    return map(this.state.pokemon, p => {
      return (
        <PokemonLink
           name={p.name}
           id={p.url}
           selectForBattle={this.selectForBattle.bind(this)}
        />);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.renderPokemon()}
      </div>
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
