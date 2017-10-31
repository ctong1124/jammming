import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: de
      searchResults: [
        {
          name: 'Baby Blue',
          artist: 'Deafheaven',
          album: 'New Bermuda'
        },
        {
          name: 'Real Death',
          artist: 'Mount Eerie',
          album: 'A Crow Looked At Me'
        },
        {
          name: 'Happy When',
          artist: 'Braids',
          album: 'Deep In the Iris'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
