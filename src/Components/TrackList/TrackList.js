import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {

  // create Track components from TrackList
  // tracks is an array
  // I know I could have done this within the render method but I was getting a strange
  // error on this.props.tracks.map where it was saying it could run map on undefined.
  // Hence, the if(tracks)
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
