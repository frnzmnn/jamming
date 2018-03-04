import React from 'react';
import './Playlist.css';
import '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange() = this.onNameChange().bind(this);
  }

  handleNameChange(e){
    const input = e.target.value;
    this.props.onNameChange(input);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.props.handleNameChange()}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
}};

export default Playlist;
