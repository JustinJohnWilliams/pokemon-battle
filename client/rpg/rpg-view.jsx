import { Component, PropTypes } from 'react';
import { ForestView } from './forest-view.jsx';
import { HomeView } from './home-view.jsx';
import { CanyonView } from './canyon-view.jsx';

export class RpgView extends Component {
  static propTypes() {
    return {
      location: PropTypes.string.isRequired,
      changeLocation: PropTypes.func.isRequired,
      captureBattling: PropTypes.func.isRequired,
      attackBattling: PropTypes.func.isRequired,
      findTrouble: PropTypes.func.isRequired,
      goHome: PropTypes.func.isRequired,
      battling: PropTypes.object.isRequired,
      chosen: PropTypes.object.isRequired,
      isBattleOver: PropTypes.boolean.isRequired,
      playByPlay: PropTypes.array.isRequired,
      activeTurnThreshold: PropTypes.number.isRequired,
      team: PropTypes.array.isRequired,
      inventory: PropTypes.array.isRequired,
      askMommyForHelp: PropTypes.func.isRequired,
      momFeelsPity: PropTypes.boolean.isRequired
    };
  }

  render() {
    if (this.props.location == 'home') {
      return (
        <div>
          <HomeView
            changeLocation={this.props.changeLocation}
            askMommyForHelp={this.props.askMommyForHelp}
            team={this.props.team}
            inventory={this.props.inventory}
            momFeelsPity={this.props.momFeelsPity}
          />
        </div>
      );
    }

    if (this.props.location == 'forest') {
      return (
        <div>
          <ForestView
            battling={this.props.battling}
            goHome={this.props.goHome}
            findTrouble={this.props.findTrouble}
            attackBattling={this.props.attackBattling}
            isBattleOver={this.props.isBattleOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            chosen={this.props.chosen}
            activeTurnThreshold={this.props.activeTurnThreshold}
            team={this.props.team}
          />
        </div>
      );
    }

    if (this.props.location == 'canyon') {
      return (
        <div>
          <CanyonView
            battling={this.props.battling}
            goHome={this.props.goHome}
            findTrouble={this.props.findTrouble}
            attackBattling={this.props.attackBattling}
            isBattleOver={this.props.isBattleOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            chosen={this.props.chosen}
            activeTurnThreshold={this.props.activeTurnThreshold}
            team={this.props.team}
          />
        </div>
      );
    }

    return null;
  }
}
