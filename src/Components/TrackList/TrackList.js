import React from 'react';
import './TrackList.css';
import '../Track/Track';

class TrackList extends React.Component {
  render(){
    this.props.track.name + this.props.track.artist + this.props.track.album;
    return (
      <div className="TrackList">
      {this.props.tracks.map(track => {return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>})}
      </div>
    );
  }
}

export default TrackList;
