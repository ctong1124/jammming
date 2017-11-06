import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  // Add track from Search Results to Playlist
  addTrack(track) {
    //first checking if track exists in playlist
    let inPlaylist = false;
    //array of objects
    let playlist = this.state.playlistTracks;
    let i = 0;
    while(!inPlaylist && i<playlist.length) {
      if(track.id === playlist[i].id) {
        inPlaylist = true;
      }
      i++;
    }
    //if track isn't in playlist, add to playlist
    if(!inPlaylist) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([{
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          uri: track.uri
        }])
      });
    }
  }

  //Remove track from Playlist
  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter(function(obj){
      return obj.id !== track.id;
    });

    this.setState({
      playlistTracks: newPlaylist
    });
  }

  // Update Playlist name in app state
  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  // Save playlist to Spotify
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(function(track){
      return track.uri;
    });
    // sends to function dealing with Spotify API
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    // clear state
    this.setState({
      playlistName: 'New Playlist',
      searchResults: [],
      playlistTracks: []
    });
  }

  // sends to function dealing with Spotify API
  search(term) {
    Spotify.search(term).then(newSearchResults => {
      this.setState({
      searchResults: newSearchResults
    })
  });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
        {console.log(this.state)}
      </div>
    );
  }
}

export default App;
