import { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { PokemonLink } from './pokemon-link.jsx';

export class BattleArenaView extends Component {
  static propTypes() {
    return {
      currentTurn: PropTypes.boolean.isRequired,
      chosenForBattle: PropTypes.object.isRequired,
      opponentChosenForBattle: PropTypes.object.isRequired,
      selectedForBattle: PropTypes.array.isRequired,
      choosePokemonForBattle: PropTypes.func.isRequired,
      attack: PropTypes.func.isRequired
    };
  }

  renderSelectedPokemon() {
    return map(this.props.selectedForBattle, p => {
      return (
        <div>
          <PokemonLink
            name={p.name}
            id={p.url}
            key={p.url}
            selected={this.props.choosePokemonForBattle}
          />
        </div>
      );
    });
  }

  renderChooseYourPokemon() {
    if (this.props.chosenForBattle) return null;

    return (
      <div>
        <h3>Select your Pokemon for Battle!</h3>
        {this.renderSelectedPokemon()}
      </div>
    );
  }

  renderField() {
    if (!this.props.chosenForBattle) return null;
    if (!this.props.opponentChosenForBattle) return null;

    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <h3>You choose:</h3>
            <h4>{this.props.chosenForBattle.name} ({this.props.chosenForBattle.hp} hp)</h4>
            <a href="javascript:;" onClick={this.props.attack}>Attack!</a>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <h3>Oppenent chooses: </h3>
            <h4>{this.props.opponentChosenForBattle.name} ({this.props.opponentChosenForBattle.hp} hp)</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderChooseYourPokemon()}
        {this.renderField()}
      </div>
    );
  }
}
