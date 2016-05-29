import { Component } from 'react';
import { bind } from 'lodash';

export class BattleArenaView extends Component {
  renderProgessBar(pokemon) {
    const percent = Math.round((pokemon.at / 1800) * 100);

    if (percent < 100) {
      return (
        <div style={{
          background: `linear-gradient(90deg, #A6D785, white ${percent}%, white)`,
          border: 'solid 1px black',
          width: '100%',
          height: '10px'
        }}
        ></div>
      );
    }

    return (
      <div style={{
        background: `linear-gradient(90deg, green, green ${percent}%, white)`,
        border: 'solid 1px black',
        width: '100%',
        height: '10px'
      }}
      ></div>
    );
  }

  renderField() {
    if (!this.props.battling) return null;

    return (
      <div>
        <div>
          <h2>{this.props.battling.name}</h2>
          <hr />
          {this.props.battling.actionText}
          <hr />
          {this.renderProgessBar(this.props.battling)}
          <hr />
        </div>
        <div>
          <h2>{this.props.chosen.name}</h2>
          <hr />
          {this.props.chosen.actionText}
          <hr />
          {this.renderProgessBar(this.props.chosen)}
          <hr />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderField()}
      </div>
    );
  }
}

class HomeView extends Component {
  _goToForest(e) {
    this.props.changeLocation('forest');
  }

  render() {
    return (
      <div>
        <div>You are currently being awesome at your home.</div>
        <ul>
          <li>You have a Pikachu. It says "pika" constantly.</li>
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
  renderOptions() {
    if (this.props.battling) return null;

    return (
      <div>
        <p>You are chillin&#39; like a villian right now.</p>
        <a href="javascript:;" onClick={this.props.findTrouble}>Go look for some trouble.</a><br />
        <a href="javascript:;" onClick={this.props.goHome}>Go home.</a>
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>You are currently being awesome in the forest.</div>
        <ul>
          <li>You has a pikachu. It says "pika" constantly.</li>
        </ul>
        <hr />

        {this.renderOptions()}

        <div>
          <BattleArenaView
            chosen={this.props.chosen}
            battling={this.props.battling}
          />
        </div>
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
          <ForestView
            battling={this.props.battling}
            goHome={this.props.goHome}
            findTrouble={this.props.findTrouble}
            chosen={this.props.chosen}
          />
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

  tickPokemon(pokemon) {
    if (!pokemon.canAttack) pokemon.at += pokemon.speed;

    if (pokemon.at >= 1800) {
      pokemon.canAttack = true;
    } else {
      pokemon.canAttack = false;
    }

    return pokemon;
  }

  tickBattle() {
    this.setState({
      chosen: this.tickPokemon(this.state.chosen),
      battling: this.tickPokemon(this.state.battling)
    });

    setTimeout(bind(() => {
      this.tickBattle();
    }, this), 500);
  }

  findTrouble() {
    if (this.state.location == 'forest') {
      this.setState({
        chosen: {
          name: 'Pikachu',
          actionText: 'It be yellin\' "Pika fuck you, bitch!"',
          speed: 90,
          at: 0
        },
        battling: {
          name: 'Bulbasaur',
          actionText: 'It comes a rushing. Whipping vines and shit.',
          speed: 45,
          at: 0
        }
      }, this.tickBattle);
    }
  }

  render() {
    return (
      <RpgView
        location={this.state.location}
        battling={this.state.battling}
        changeLocation={this.changeLocation.bind(this)}
        goHome={this.goHome.bind(this)}
        findTrouble={this.findTrouble.bind(this)}
        chosen={this.state.chosen}
      />
    );
  }
}
