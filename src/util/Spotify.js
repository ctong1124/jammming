const clientId = 'dd4b4488be6041c195cb141b48683f82';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';

let Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          if (jsonResponse.tracks) {
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              };
            });
          }
          return [];
        }
      );
  },

  savePlaylist(name, uris) {
    if(name && uris) {
      let userID = '';
      let playlistID='';

      //GET user ID
      const accessToken = Spotify.getAccessToken();
      console.log(accessToken, 'in save playlist');
        return fetch('https://api.spotify.com/v1/me', {
          headers: {Authorization:`Bearer ${accessToken}`}
        }).then(
          response => response.json()
        ).then(
          jsonResponse => {
            userID = jsonResponse.id;

            // POST create new playlist using userID
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
              method: 'POST',
              headers: {
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: name
              })
            }
          ).then(
            response => {return response.json()}
          ).then(
            jsonResponse => {
              playlistID = jsonResponse.id;

              // POST add tracks to playlist using user id and new created playlist
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                method: 'POST',
                headers: {
                  'Authorization':`Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  uris: uris
                })
              }
            );
            });
          }
        );
  }
    else {
      return;
    }
  }

}

export default Spotify;
