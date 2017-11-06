const clientId = 'dd4b4488be6041c195cb141b48683f82';
// const secret = '02fa5ba0c1124d4f827348d282d0b058';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';

let Spotify = {
  // getAccessToken() {
  //   if(accessToken) {
  //     return new Promise(
  //       resolve => resolve(accessToken)
  //     );
  //   }
  //   else {
  //     const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
  //     const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);
  //
  //     if (accessTokenCheck && expiresInCheck) {
  //       accessToken = accessTokenCheck[1];
  //       const expiresIn = expiresInCheck[1];
  //       window.setTimeout(() => accessToken = '', expiresIn * 1000);
  //       window.history.pushState('Access Token', null, '/');
  //       return new Promise(
  //         resolve => resolve(accessToken)
  //       );
  //     } else {
  //       window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  //     }
  //
  //   }
  // },

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
    // return Spotify.getAccessToken().then(() => {

      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          console.log(accessToken, 'in search');
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
    // });
  },

  savePlaylist(name, uris) {
    if(name && uris) {
      let userID = '';
      let playlistID='';

      //GET user ID
      // Spotify.getAccessToken().then(() => {
      console.log(accessToken, 'in save playlist');
        return fetch('https://api.spotify.com/v1/me', {
          headers: {Authorization:`Bearer ${accessToken}`}
        }).then(
          response => response.json()
        ).then(
          jsonResponse => {
            userID = jsonResponse.id;
            console.log(userID);

          //   return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          //   {
          //     method: 'POST',
          //     headers: {
          //       'Authorization':`Bearer ${accessToken}`,
          //       'Content-Type': 'application/json'
          //     },
          //     body: JSON.stringify({
          //       name: name
          //     })
          //   }
          // ).then(
          //   response => {return response.json()}
          // ).then(
          //   jsonResponse => {
          //     playlistID = jsonResponse.id;
          //     console.log(playlistID);
          //
          //     return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          //     {
          //       method: 'POST',
          //       headers: {
          //         'Authorization':`Bearer ${accessToken}`,
          //         'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify({
          //         uris: uris
          //       })
          //     }
          //   );
          //
          //   });
          //
          //
          }
        );
      // });

    //   Spotify.getAccessToken().then(() => {
    //     return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Authorization':`Bearer ${accessToken}`,
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         name: name
    //       })
    //     }
    //   ).then(
    //     response => {return response.json()}
    //   ).then(
    //     jsonResponse => {
    //       playlistID = jsonResponse.id;
    //       console.log(playlistID);
    //     });
    // });
  }
    else {
      return;
    }
  }

}

export default Spotify;
