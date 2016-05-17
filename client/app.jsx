import { SandboxContainer } from './sandbox-container.jsx';
import { PokemonBattleContainer } from './pokemon-battle-container.jsx';

function initSandboxApp() {
  ReactDOM.render(
    <SandboxContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;

function initApp() {
  ReactDOM.render(
    <PokemonBattleContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
module.exports.initSandboxApp = initSandboxApp;
