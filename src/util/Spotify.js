import React from 'react';
const accessToken;
const client_id = 'ab82f896feb14639a6bf28ffadeee321';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken(){
    if (accessToken){
      return accessToken;
    }
    var accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    var expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      var expirationTime = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term){
    var accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },
  savePlaylist(playlistName,trackURIs){
    if (!playlistName || !trackURIs) {
      return;
    }
    var accessToken = Spotify.getAccessToken();
    var headers = {Authorization: `Bearer ${accessToken}`};
    var userID;
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });
    });
  }
}

export default Spotify;
