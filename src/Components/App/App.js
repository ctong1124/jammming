import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
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
      playlistName: 'icryabit',
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
  }

  addTrack(track) {
    //first checking if track exists in playlist
    let inPlaylist = false;
    //array of objects
    let playlist = this.state.playlistTracks;
    let i = 0;
    while(!inPlaylist) {
      if(track.id === playlist[i].id) {
        inPlaylist = true;
      }
      i++;
    }

    //if track isn't in playlist, add to playlist
    if(!inPlaylist) {
      this.setState({
        id: track.name,
        name: track.name,
        artist: track.artist,
        album: track.album
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
