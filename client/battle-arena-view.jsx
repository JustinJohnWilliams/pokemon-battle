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

  onClick() {
    this.props.attack(
      this.props.chosenForBattle,
      this.props.opponentChosenForBattle);
  }

  renderChooseYourPokemon() {
    if (!this.props.currentTurn) return null;
    if (this.props.chosenForBattle) return null;

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
    if (!this.props.chosenForBattle) return null;
    if (!this.props.currentTurn) return null;

    console.log(this.props.chosenForBattle);
    console.log(this.props.opponentChosenForBattle);
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <h3>You choose:</h3>
            <h4>{this.props.chosenForBattle.name} ({this.props.chosenForBattle.hp} hp)</h4>
            <a href="javascript:;" onClick={this.onClick.bind(this)}>Attack!</a>
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
        {this.renderCurrentTurn()}
      </div>
    );
  }
}
