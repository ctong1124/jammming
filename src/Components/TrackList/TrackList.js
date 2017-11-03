import React from 'react';
// import ReactDOM from 'react-dom';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  // create Track components from TrackList
  //tracks is an array
  createTracks(tracks, onAddFromParent, isRemovalFromParent, onRemoveFromParent) {
    if(tracks) {
      // let boo = [];
      // for(let i=0; i<tracks.length;i++) {
      //   boo.push(<Track track={tracks[i]} onAdd={onAddFromParent} isRemoval={isRemovalFromParent}/>);
      // }
      // return boo;
      // console.log(jsx);
      // return jsx;
      return tracks.map(function(track) {
        return <Track track={track} onAdd={onAddFromParent} isRemoval={isRemovalFromParent} onRemove={onRemoveFromParent} />
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
