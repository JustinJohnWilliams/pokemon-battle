import { Component } from 'react';
import { bind, get, map } from 'lodash';

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

  renderAttack() {
    if (!this.props.chosen.canAttack) return null;
    if (this.props.isGameOver) return null;

    return (
      <div>
        <a href='javascript:;' onClick={this.props.attackBattling}>Attack</a>
        <br />
        <a href='javascript:;' onClick={this.props.captureBattling}>Throw dat ball</a>
      </div>
    );
  }

  renderPlayPlay() {
    return (
      <div>
        {map(this.props.playByPlay, p => <div>{p}</div>)}
      </div>
    );
  }

  renderField() {
    if (!this.props.battling) return null;

    return (
      <div>
        <div>
          <h2>{this.props.battling.name} (hp: {this.props.battling.hp})</h2>
          <hr />
          {this.props.battling.actionText}
          <hr />
          {this.renderProgessBar(this.props.battling)}
          <hr />
        </div>
        <div>
          <h2>{this.props.chosen.name} (hp: {this.props.chosen.hp})</h2>
          <hr />
          {this.props.chosen.actionText}
          <hr />
          {this.renderProgessBar(this.props.chosen)}
          <hr />
          {this.renderAttack()}
          <hr />
          {this.renderPlayPlay()}
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
            isGameOver={this.props.isGameOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
            attackBattling={this.props.attackBattling}
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
            attackBattling={this.props.attackBattling}
            isGameOver={this.props.isGameOver}
            captureBattling={this.props.captureBattling}
            playByPlay={this.props.playByPlay}
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
      location: 'home',
      team: ['Pikachu'],
      playByPlay: []
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
    if (this.isGameOver()) return;

    this.tickBattleCore();
  }

  tickBattleCore() {
    const chosen = this.tickPokemon(this.state.chosen);
    const battling = this.tickPokemon(this.state.battling);
    let playByPlay = this.state.playByPlay;

    if (battling.canAttack) {
      chosen.hp -= 10;
      battling.at -= 1800;
      battling.canAttack = false;
      playByPlay = playByPlay.concat(`${this.state.battling.name} attacks ${this.state.chosen.name} for 10.`);
    }

    this.setState({
      chosen: chosen,
      battling: battling,
      playByPlay
    });

    setTimeout(bind(() => {
      this.tickBattle();
    }, this), 500);
  }

  attackBattling() {
    const battling = this.state.battling;
    battling.hp -= 10;

    const chosen = this.state.chosen;
    chosen.at -= 1800;

    this.setState({
      battling,
      chosen,
      playByPlay: this.state.playByPlay.concat(`${this.state.chosen.name} attacks ${this.state.battling.name} for 10.`)
    });
  }

  findTrouble() {
    if (this.state.location == 'forest') {
      this.setState({
        chosen: {
          name: 'Pikachu',
          actionText: 'It be yellin\' "Pika fuck you, bitch!"',
          speed: 90,
          hp: 50,
          at: 0
        },
        battling: {
          name: 'Bulbasaur',
          actionText: 'It comes a rushing. Whipping vines and shit.',
          speed: 45,
          hp: 50,
          at: 0
        },
        playByPlay: ['The throwdown has begun between Pikachu and Bulbasaur. Who will the bitch be?']
      }, this.tickBattle);
    }
  }

  isGameOver() {
    if (get(this.state, 'chosen.hp', 0) <= 0 ||
        get(this.state, 'battling.hp', 0) <= 0 ||
        get(this.state, 'battling.captured', false) == true) return true;

    return false;
  }

  captureBattling() {
    const battling = this.state.battling;
    const percent = 1.0 - (this.state.battling.hp / 50);
    const team = this.state.team.concat(this.state.battling.name);

    if (Math.random(1) < percent) {
      battling.captured = true;

      this.setState({
        team,
        playByPlay: this.state.playByPlay.concat(`${battling.name} succumbs to your ball.`)
      }, this.tickBattleCore());
    } else {
      this.setState({
        team,
        playByPlay: this.state.playByPlay.concat(`Your ball hits ${battling.name} in the head, but is batted away. Too stronk.`)
      }, this.tickBattleCore());
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
        attackBattling={this.attackBattling.bind(this)}
        isGameOver={this.isGameOver()}
        captureBattling={this.captureBattling.bind(this)}
        playByPlay={this.state.playByPlay}
        chosen={this.state.chosen}
      />
    );
  }
}
