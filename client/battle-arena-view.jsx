import { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { PokemonLink } from './pokemon-link.jsx';

export class BattleArenaView extends Component {
  static propTypes() {
    return {
      currentTurn: PropTypes.boolean.isRequired,
      currentPokemon: PropTypes.object.isRequired,
      selectedForBattle: PropTypes.array.isRequired,
      choosePokemonForBattle: PropTypes.func.isRequired
    };
  }

  renderChooseYourPokemon() {
    if (!this.props.currentTurn) return null;
    if (this.props.currentPokemon) return null;

    return (
      map(this.props.selectedForBattle, p => {
        return (
          <div>
            <PokemonLink
              id={p.url}
              name={p.name}
              selected={this.props.choosePokemonForBattle}
            />
          </div>
        );
      })
    );
  }

  renderCurrentTurn() {
    if (!this.props.currentPokemon) return null;
    if (!this.props.currentTurn) return null;

    return (
      <div>
        <a href="javascript:;">Attack</a>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderChooseYourPokemon()}
        {this.renderCurrentTurn()}
      </div>
    );
  }
}
