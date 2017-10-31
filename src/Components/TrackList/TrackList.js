import React from 'react';
// import ReactDOM from 'react-dom';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  // create Track components from TrackList
  createTracks(tracks) {
    if(tracks) {
      return tracks.map(function(track) {
        return <Track track={track}/>
      });
    }
  }


  render() {
    return(
      <div className="TrackList">
        {this.createTracks(this.props.tracks)}
      </div>
    );
  }
}

export default TrackList;
