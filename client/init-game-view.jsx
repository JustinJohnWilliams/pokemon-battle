import { Component, PropTypes } from 'react';

export class InitGameView extends Component {
  static propTypes() {
    return {
      joinGame: PropTypes.func.isRequired
    };
  }

  joinGame() {
    this.props.joinGame();
  }

  render() {
    return (
      <div>
        <a href='javascript:;' onClick={this.joinGame.bind(this)}>Join Game</a>
      </div>
    );
  }
}
