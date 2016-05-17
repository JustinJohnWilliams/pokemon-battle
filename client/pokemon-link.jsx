import { Component, PropTypes } from 'react';

export class PokemonLink extends Component {
  static propTypes() {
    return {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.func.isRequired
    };
  }

  onClick() {
    console.log(this.props.id);
    this.props.selected(this.props.id);
  }

  render() {
    return (
      <a href='javascript:;' onClick={this.onClick.bind(this)}>
        {this.props.name}
      </a>
    );
  }
}
