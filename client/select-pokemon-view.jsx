import { map } from 'lodash';
import { Component, PropTypes } from 'react';
import { PokemonLink } from './pokemon-link.jsx';

export class SelectPokemonView extends Component {
  static propTypes() {
    return {
      pokemon: PropTypes.object.isRequired,
      selectForBattle: PropTypes.func.isRequired,
      selectedForBattle: PropTypes.array.isRequired,
      playerId: PropTypes.int.isRequired
    };
  }

  border() {
    return { border: 'solid 1px silver', clear: 'both', margin: '10px', padding: '10px' };
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
        <div className="col-md-2 col-sm-2 col-xs-2">
          <PokemonLink
            name={p.name}
            id={p.url}
            key={p.url}
          />
        </div>
      );
    });
  }


  render() {
    return (
      <div>
        <h1 className="col-md-12">Select your pokemon, Player {this.props.playerId}! </h1>
        <hr />
        <div style={this.border()}>
          {this.renderPokemon()}
          &nbsp;
        </div>
        <hr />
        <h1 className="col-md-12">Selected pokemon!!</h1>
        <hr />
        <div style={this.border()}>
          {this.renderSelectedForBattle()}
          &nbsp;
        </div>
      </div>
    );
  }
}
