import { Component } from 'react';

class PokemonBattleContainer extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
      <div>hello</div>
    );
  }
}

function initApp() {
  ReactDOM.render(
    <PokemonBattleContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
