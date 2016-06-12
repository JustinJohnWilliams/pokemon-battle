import { Component, PropTypes } from 'react';
import { map, uniq } from 'lodash';

export class TeamView extends Component {
  static propTypes() {
    return {
      team: PropTypes.array.isRequired
    };
  }

  render() {
    return (
      <div>
        <div>Your posse: </div>
        <ul>
          {map(uniq(this.props.team), p => <li>{p.name}</li>)}
        </ul>
        <hr />
      </div>
    );
  }
}
