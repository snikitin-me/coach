import React from "react";
import PropTypes from 'prop-types'
import YouTube from './YouTube';
import Subtitles from './Subtitles';

export default class Layout extends React.Component {
  static propTypes = {
    videoId: PropTypes.string
  }

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

    var subtitlesFileUrl = `/data/${this.props.videoId}-eng.srt.json`;

    return (
      <div>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onReady={this._onReady}
          onChangeCurrentTime={this._onChangeCurrentTime.bind(this)}
        />
        <Subtitles
          text={this.props.videoId}
          fileUrl={subtitlesFileUrl}
          time={this.state.time}
        />
      </div>
    );
  }
  
  _onChangeCurrentTime(time){
    this.setState({time});
  }
}
