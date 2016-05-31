class ForestView extends Component {
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
        <div>You are currently being awesome in the forest.</div>
        <ul>
          <li>You has a pikachu. It says "pika" constantly.</li>
        </ul>
        <hr />
        {this.renderOptions()}
        <div>
          <BattleArenaView
            chosen={this.props.chosen}
            battling={this.props.battling}
            isGameOver={this.props.isGameOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            attackBattling={this.props.attackBattling}
          />
        </div>
      </div>
    );
  }
}
