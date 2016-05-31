import { first, last, take } from 'lodash';
import { Component } from 'react';
import { BattleArenaView } from './versus/battle-arena-view.jsx';

export class SandboxContainer extends Component {
  constructor() {
    super();
  }

  attack(from, to) {
    req({
      url: '/attack',
      method: 'post',
      data: { from: from, to: to }
    });
  }

  render() {
    const pokemon = [
      { name: 'pikachu', hp: 45, url: 'pikachu' },
      { name: 'ditto', hp: 45, url: 'ditto' },
      { name: 'clefairy', hp: 45, url: 'clefairy' },
      { name: 'cloyster', hp: 45, url: 'cloyster' },
      { name: 'cubone', hp: 45, url: 'cubone' },
      { name: 'dewgong', hp: 45, url: 'dewgong' },
      { name: 'diglett', hp: 45, url: 'diglett' },
      { name: 'ditto', hp: 45, url: 'ditto' },
      { name: 'dodrio', hp: 45, url: 'dodrio' },
      { name: 'doduo', hp: 45, url: 'doduo' },
      { name: 'dragonair', hp: 45, url: 'dragonair' },
      { name: 'dragonite', hp: 45, url: 'dragonite' },
      { name: 'dratini', hp: 45, url: 'dratini' },
      { name: 'drowzee', hp: 45, url: 'drowzee' },
      { name: 'dugtrio', hp: 45, url: 'dugtrio' },
      { name: 'eevee', hp: 45, url: 'eevee' },
      { name: 'ekans', hp: 45, url: 'ekans' },
      { name: 'electabuzz', hp: 45, url: 'electabuzz' },
      { name: 'electrode', hp: 45, url: 'electrode' },
      { name: 'exeggcute', hp: 45, url: 'exeggcute' },
      { name: 'exeggutor', hp: 45, url: 'exeggutor' },
      { name: 'farfetchd', hp: 45, url: 'farfetchd' },
      { name: 'fearow', hp: 45, url: 'fearow' },
      { name: 'flareon', hp: 100, url: 'flareon' }
    ];

    let chosenForBattle = first(pokemon);
    let opponentChosenForBattle = last(pokemon);

    let selectedForBattle = take(pokemon, 5);

    return (
      <div>
        <BattleArenaView
          currentTurn={'true'}
          chosenForBattle={chosenForBattle}
          opponentChosenForBattle={opponentChosenForBattle}
          selectedForBattle={selectedForBattle}
          attack={this.attack.bind(this)}
        />
      </div>
    );
  }
}
