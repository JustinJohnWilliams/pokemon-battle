import { Component, PropTypes } from 'react';

export class AttackLink extends Component {
  static propTypes() {
    return {
      name: PropTypes.string.isRequired
    };
  }
}
