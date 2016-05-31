import { Component, PropTypes } from 'react';
import { map } from 'lodash';

export class HomeView extends Component {
  static propTypes() {
    return {
      changeLocation: PropTypes.func.isRequired,
      team: PropTypes.array.isRequired
    };
  }

  _goToForest(e) {
    this.props.changeLocation('forest');
  }

  renderTeam() {
    return (
      <ul>
        {map(this.props.team, p => <li>{p}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div>You are currently being awesome at your home.</div>
        <br />
        <div>Your bitches: </div>
        {this.renderTeam()}
        <hr />
        <div>
          <p>There is a rock face jutting out. It looks freaking scary.</p>
          <a href="javascript:;">Go be awesome over there.</a>
        </div>
        <hr />
        <div>
          <p>There is a line of trees off in the distance.</p>
          <a
            href="javascript:;"
            data-ui-location="forest"
            onClick={this._goToForest.bind(this)}
          >
            Go be awesome over there.
          </a>
        </div>
        <hr />
      </div>
    );
  }
}
