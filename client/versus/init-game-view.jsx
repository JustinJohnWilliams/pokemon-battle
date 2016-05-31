import { Component, PropTypes } from 'react';

export class InitGameView extends Component {
  static propTypes() {
    return {
      joinGame: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div>
        <a href='javascript:;' onClick={this.props.joinGame}>Join Game</a>
      </div>
    );
  }
}
