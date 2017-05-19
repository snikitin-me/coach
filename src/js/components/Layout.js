import React from "react";
import YouTube from './YouTube';
import Subtitles from './Subtitles';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      time: 0
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  // https://developers.google.com/youtube/js_api_reference
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
        <YouTube
          videoId="8aGhZQkoFbQ"
          opts={opts}
          onReady={this._onReady}
          onChangeCurrentTime={this._onChangeCurrentTime.bind(this)}
        />
        <Subtitles
          text="8aGhZQkoFbQ"
          time={this.state.time}
        />
      </div>
    );
  }
  
  _onChangeCurrentTime(time){
    this.setState({time});
  }
}
