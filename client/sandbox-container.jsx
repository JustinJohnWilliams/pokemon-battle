import { Component } from 'react';
import { SelectPokemonView } from './select-pokemon-view.jsx';

export class SandboxContainer extends Component {
  render() {
    let pokemon = [
      { name: 'pikachu', url: 'pikachu' },
      { name: 'ditto', url: 'ditto' },
      { name: 'clefairy', url: 'clefairy' },
      { name: 'cloyster', url: 'cloyster' },
      { name: 'cubone', url: 'cubone' },
      { name: 'dewgong', url: 'dewgong' },
      { name: 'diglett', url: 'diglett' },
      { name: 'ditto', url: 'ditto' },
      { name: 'dodrio', url: 'dodrio' },
      { name: 'doduo', url: 'doduo' },
      { name: 'dragonair', url: 'dragonair' },
      { name: 'dragonite', url: 'dragonite' },
      { name: 'dratini', url: 'dratini' },
      { name: 'drowzee', url: 'drowzee' },
      { name: 'dugtrio', url: 'dugtrio' },
      { name: 'eevee', url: 'eevee' },
      { name: 'ekans', url: 'ekans' },
      { name: 'electabuzz', url: 'electabuzz' },
      { name: 'electrode', url: 'electrode' },
      { name: 'exeggcute', url: 'exeggcute' },
      { name: 'exeggutor', url: 'exeggutor' },
      { name: 'farfetchd', url: 'farfetchd' },
      { name: 'fearow', url: 'fearow' },
      { name: 'flareon', url: 'flareon' }
    ];

    return (<SelectPokemonView pokemon={pokemon} />);
  }
}
