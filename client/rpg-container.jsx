import { Component } from 'react';

class HomeView extends Component {
  _goToForest(e) {
    this.props.changeLocation('forest');
  }

  render() {
    return (
      <div>
        <div>You are currently being awesome at your home.</div>
        <ul>
          <li>You have a pikachu. It says "pika" constantly.</li>
        </ul>
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

class ForestView extends Component {
  render() {
    return (
      <div>
        <div>You are currently being awesome in the forest.</div>
        <ul>
          <li>You has a pikachu. It says "pika" constantly.</li>
        </ul>
        <hr />
        <div>
          <p>You are chillin' like a villian right now.</p>
          <a href="javascript:;">Go look for some trouble.</a><br />
          <a href="javascript:;" onClick={this.props.goHome}>Go home.</a>
        </div>
        <hr />
      </div>
    );
  }
}

class RpgView extends Component {
  render() {
    if (this.props.location == 'home') {
      return (
        <div>
          <HomeView changeLocation={this.props.changeLocation} />
        </div>
      );
    }

    if (this.props.location == 'forest') {
      return (
        <div>
          <ForestView goHome={this.props.goHome} />
        </div>
      );
    }

    return null;
  }
}

export class RpgContainer extends Component {
  constructor() {
    super();
    this.state = {
      location: 'home'
    };
  }

  changeLocation(newLocation) {
    this.setState({ location: newLocation });
  }

  goHome() {
    this.changeLocation('home');
  }

  render() {
    return (
      <RpgView
        location={this.state.location}
        changeLocation={this.changeLocation.bind(this)}
        goHome={this.goHome.bind(this)}
      />
    );
  }
}


/*
<div>
  <div>You are currently being awesome at your home.</div>
  <ul>
      <li>You has a pikachu. It says "pika" constantly.</li>
  </ul>
  <hr />
  <div>
      <p>There is a rock face. It looks freaking scary.</p>
      <a href="javascript:;">Go be awesome over there</a>
  </div>
  <hr />
  <div>
      <p>There is a line of trees off in the distance.</p>
      <a href="javascript:;">Go be awesome over there</a>
  </div>
  <hr />
</div>
 */
