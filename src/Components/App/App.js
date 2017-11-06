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
      // search: de
      searchResults: [
        {
          id: 'Baby Blue',
          name: 'Baby Blue',
          artist: 'Deafheaven',
          album: 'New Bermuda'
        },
        {
          id: 'Real Death',
          name: 'Real Death',
          artist: 'Mount Eerie',
          album: 'A Crow Looked At Me'
        },
        {
          id: 'Happy When',
          name: 'Happy When',
          artist: 'Braids',
          album: 'Deep In the Iris'
        }
      ],
      playlistName: 'test',
      playlistTracks: [
        {
          id: 'Twilight',
          name: 'Twilight',
          artist: 'Elliot Smith',
          album: 'From A Basement On the Hill'
        },
        {
          id: 'i was all over her',
          name: 'i was all over her',
          artist: 'salvia palth',
          album: 'melanchole'
        },
        {
          id: 'Shift - Alternate Version',
          name: 'Shift - Alternate Version',
          artist: 'Grizzly Bear',
          album: 'Friend'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
  }

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
          id: track.name,
          name: track.name,
          artist: track.artist,
          album: track.album
        }])
      });
    }
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter(function(obj){
      return obj.id !== track.id;
    });

    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {

  }

  search(term) {
    Spotify.search(term).then(newSearchResults => this.setState({
      searchResults: newSearchResults
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
