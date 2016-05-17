import { map } from 'lodash';
import { Component, PropTypes } from 'react';
import { PokemonLink } from './pokemon-link.jsx';

export class SelectPokemonView extends Component {
  static propTypes() {
    return {
      pokemon: PropTypes.object.isRequired,
      selectForBattle: PropTypes.func.isRequired,
      selectedForBattle: PropTypes.array.isRequired
    };
  }

  renderPokemon() {
    return map(this.props.pokemon, p => {
      return (
        <div className="col-md-2 col-sm-2 col-xs-2">
          <PokemonLink
            name={p.name}
            id={p.url}
            key={p.url}
            selected={this.props.selectForBattle}
          />
        </div>
      );
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
        <div style={{ border: 'solid 1px silver', clear: 'both', margin: '10px', padding: '10px' }}>
          {this.renderPokemon()}
          &nbsp;
        </div>
        <hr />
        <div>
          {this.renderSelectedForBattle()}
        </div>
      </div>
    );
  }
}
