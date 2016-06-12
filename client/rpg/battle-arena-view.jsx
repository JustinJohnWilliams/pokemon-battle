import { Component, PropTypes } from 'react';
import { map } from 'lodash';

export class BattleArenaView extends Component {
  static propTypes() {
    return {
      chosen: PropTypes.object.isRequired,
      isBattleOver: PropTypes.boolean.isRequired,
      attackBattling: PropTypes.func.isRequired,
      captureBattling: PropTypes.func.isRequired,
      playByPlay: PropTypes.array.isRequired,
      goHome: PropTypes.func.isRequired,
      battling: PropTypes.object.isRequired,
      activeTurnThreshold: PropTypes.number.isRequired
    };
  }

  renderProgessBar(pokemon) {
    const percent = Math.round((pokemon.at / this.props.activeTurnThreshold) * 100);

    if (percent < 100) {
      return (
        <div style={{
          background: `linear-gradient(90deg, green, white ${percent}%, white)`,
          border: 'solid 1px black',
          width: '100%',
          height: '10px'
        }}
        ></div>
      );
    }

    return (
      <div style={{
        background: `linear-gradient(90deg, green, green ${percent}%, white)`,
        border: 'solid 1px black',
        width: '100%',
        height: '10px'
      }}
      ></div>
    );
  }

  renderAttack() {
    if (!this.props.chosen.canAttack) return null;
    if (this.props.isBattleOver) return null;

    return (
      <div>
        <a href='javascript:;' onClick={this.props.attackBattling}>Attack</a>
        <br />
        <a href='javascript:;' onClick={this.props.captureBattling}>Throw dat ball</a>
      </div>
    );
  }

  renderPostBattle() {
    if (!this.props.isBattleOver) return null;

    return (
      <div>
        <a href='javascript:;' onClick={this.props.goHome}>Go home.</a>
      </div>
    );
  }


  renderPlayPlay() {
    return (
      <div>
        {map(this.props.playByPlay, p => <div>{p}</div>)}
      </div>
    );
  }

  renderField() {
    if (!this.props.battling) return null;

    return (
      <div>
        <div>
          <h2>{this.props.battling.name} (hp: {this.props.battling.hp})</h2>
          <hr />
          {this.props.battling.actionText}
          <hr />
          {this.renderProgessBar(this.props.battling)}
          <hr />
        </div>
        <div>
          <h2>{this.props.chosen.name} (hp: {this.props.chosen.hp})</h2>
          <hr />
          {this.props.chosen.actionText}
          <hr />
          {this.renderProgessBar(this.props.chosen)}
          <hr />
          {this.renderAttack()}
          {this.renderPostBattle()}
          <hr />
          {this.renderPlayPlay()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderField()}
      </div>
    );
  }
}
