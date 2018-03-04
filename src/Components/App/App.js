import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    playlistName: "My playlist",
    playlistTracks: [
      {id: 1,
      name: "one song",
      artist: "dude1"
      album: "first album"},
      {id: 2,
      name: "another song",
      artist: "dude2"
      album: "second album"},
    ]
    searchResults: [
      {
        id: 3,
        name: "Song",
        artist: "dude1",
        album: "Oh happy day",
      },
      {
        id: 4,
        name: "Track",
        artist: "dude2",
        album: "I don´t like banana",
      },
      {
        id: 5,
        name: "Lulaloo",
        artist: "dude3",
        album: "But strawberries",
      }
    ]
  };
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}

addTrack(track) {
   let countMatch = 0;
   this.state.playlistTracks.map(playlistTrack => {
     if(track.id === this.state.playlistTrack.id){
       countMatch ++;
     }
   });
   if(!countMatch){
     this.setState({playListTracks: track});
   }
   this.addTrack = this.addTrack.bind(this);
 }

 removeTrack(track) {
 //Task 49:
 }

 updatePlaylistName(name) {
 //Task 57: input?
  this.setState({playlistName: event.target.value});
 }

 savePlaylist() {
  //Step 63:
 }

 search(term) {
   console.log(term);
 }

 render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search()} />
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack()} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
