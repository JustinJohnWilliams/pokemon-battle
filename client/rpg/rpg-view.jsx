import { Component, PropTypes } from 'react';
import { ForestView } from './forest-view.jsx';
import { HomeView } from './home-view.jsx';

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
      isGameOver: PropTypes.boolean.isRequired,
      playByPlay: PropTypes.array.isRequired,
      activeTurnThreshold: PropTypes.number.isRequired,
      team: PropTypes.array.isRequired
    };
  }

  render() {
    if (this.props.location == 'home') {
      return (
        <div>
          <HomeView
            changeLocation={this.props.changeLocation}
            team={this.props.team}
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
            isGameOver={this.props.isGameOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            chosen={this.props.chosen}
            activeTurnThreshold={this.props.activeTurnThreshold}
          />
        </div>
      );
    }

    return null;
  }
}
