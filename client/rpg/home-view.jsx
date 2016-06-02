import { Component, PropTypes } from 'react';
import { map, uniq } from 'lodash';

export class HomeView extends Component {
  static propTypes() {
    return {
      changeLocation: PropTypes.func.isRequired,
      team: PropTypes.array.isRequired,
      askMommyForHelp: PropTypes.func.isRequired,
      momFeelsPity: PropTypes.boolean.isRequired
    };
  }

  _goToForest(e) {
    this.props.changeLocation('forest');
  }

  renderAskMommy() {
    if (this.props.team.length > 0) return null;
    return (
      <div>
        <a href="javascript:;" onClick={this.props.askMommyForHelp}>Ask Mommy for help</a>
      </div>
    );
  }

  renderTeam() {
    if (this.props.team.length == 0) return null;
    if (this.props.momFeelsPity)
      return (
        <div>
          <p>Your mom feels pity for your sorry ass and gives you a Pikachu.</p>
          <p>She curses you for being a &quot;worthless millenial&quot; and tells you to go make soemthing of yourself.</p>
        </div>
      );
    return (
      <div>
        <div>Your bitches: </div>
        <ul>
          {map(uniq(this.props.team), p => <li>{p}</li>)}
        </ul>
        <hr />
      </div>
    );
  }

  renderAdventures() {
    if (this.props.team.length == 0) return null;
    return (
      <div>
        <div>
          <p>There is a rock face jetting out. It looks freaking scary.</p>
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

  render() {
    return (
      <div>
        <div>You are currently being worthless at your home.</div>
        <br />
        {this.renderAskMommy()}
        {this.renderTeam()}
        {this.renderAdventures()}
      </div>
    );
  }
}
