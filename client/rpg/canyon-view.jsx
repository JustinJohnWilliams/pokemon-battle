import { Component, PropTypes } from 'react';
import { BattleArenaView } from './battle-arena-view.jsx';
import { TeamView } from './team-view.jsx';

export class CanyonView extends Component {
  static propTypes() {
    return {
      battling: PropTypes.object.isRequired,
      findTrouble: PropTypes.func.isRequired,
      goHome: PropTypes.func.isRequired,
      chosen: PropTypes.object.isRequired,
      isBattleOver: PropTypes.func.isRequired,
      captureBattling: PropTypes.func.captureBattling,
      playByPlay: PropTypes.array.isRequired,
      attackBattling: PropTypes.func.isRequired,
      activeTurnThreshold: PropTypes.number.isRequired,
      team: PropTypes.array.isRequired
    };
  }

  renderOptions() {
    if (this.props.battling) return null;

    return (
      <div>
        <p>You are chillin&#39; like a villian right now.</p>
        <a href="javascript:;" onClick={this.props.findTrouble}>Go look for some trouble.</a><br />
        <a href="javascript:;" onClick={this.props.goHome}>Go home.</a>
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>You are currently being awesome in the canyon.</div>
        <TeamView team={this.props.team} />
        <hr />
        {this.renderOptions()}
        <div>
          <BattleArenaView
            chosen={this.props.chosen}
            battling={this.props.battling}
            isBattleOver={this.props.isBattleOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            attackBattling={this.props.attackBattling}
            goHome={this.props.goHome}
            activeTurnThreshold={this.props.activeTurnThreshold}
          />
        </div>
      </div>
    );
  }
}
