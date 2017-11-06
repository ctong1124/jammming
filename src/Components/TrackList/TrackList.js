import React from 'react';
// import ReactDOM from 'react-dom';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // create Track components from TrackList
  //tracks is an array
  createTracks(tracks, onAddFromParent, isRemovalFromParent, onRemoveFromParent) {
    if(tracks) {
      let i = 0;
      return tracks.map(function(track) {
        return <Track key={i++} track={track} onAdd={onAddFromParent} isRemoval={isRemovalFromParent} onRemove={onRemoveFromParent} />
      });
    }
  }


  render() {
    return(
      <div className="TrackList">
        {this.createTracks(this.props.tracks, this.props.onAdd, this.props.isRemoval, this.props.onRemove)}
      </div>
    );
  }
}

export default TrackList;
