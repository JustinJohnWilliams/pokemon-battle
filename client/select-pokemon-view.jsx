import { map } from 'lodash';
import { Component, PropTypes } from 'react';
import { PokemonLink } from './pokemon-link.jsx';

export class SelectPokemonView extends Component {
  static propTypes() {
    return {
      pokemon: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      selectForBattle: PropTypes.func.isRequired,
      selectedForBattle: PropTypes.array.isRequired
    };
  }

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
