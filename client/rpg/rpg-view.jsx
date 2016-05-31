class RpgView extends Component {
  render() {
    if (this.props.location == 'home') {
      return (
        <div>
          <HomeView changeLocation={this.props.changeLocation} />
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
          />
        </div>
      );
    }

    return null;
  }
}
