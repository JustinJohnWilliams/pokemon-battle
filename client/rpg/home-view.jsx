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
