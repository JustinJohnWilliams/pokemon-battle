import { SandboxContainer } from './sandbox-container.jsx';
import { PokemonBattleContainer } from './versus/pokemon-battle-container.jsx';
import { RpgContainer } from './rpg/rpg-container.jsx';

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

function initRpg() {
  ReactDOM.render(
    <RpgContainer />,
    document.getElementById('content')
  );
}


module.exports.initApp = initApp;
module.exports.initSandboxApp = initSandboxApp;
module.exports.initRpg = initRpg;
