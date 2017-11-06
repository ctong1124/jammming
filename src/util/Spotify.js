const clientId = 'dd4b4488be6041c195cb141b48683f82';
const secret = '02fa5ba0c1124d4f827348d282d0b058';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';

let Spotify = {
  getAccessToken() {
    if(accessToken) {
      return new Promise(
        resolve => resolve(accessToken)
      );
    }
    else {
      const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
      const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenCheck && expiresInCheck) {
        accessToken = accessTokenCheck[1];
        const expiresIn = expiresInCheck[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
      return new Promise(
        resolve => resolve(accessToken)
      );
    }
  },


  search(term) {
    return Spotify.getAccessToken().then(() => {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          if (jsonResponse.tracks) {
            console.log(jsonResponse);
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
    });
    // return Spotify.getAccessToken().then(
    //       () => {return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    //       {
    //         method: 'GET',
    //         headers: {Authorization: `Bearer ${accessToken}`}
    //       });
    //   })
    //   .then(response => {return response.json()}).then(jsonResponse => {
    //   console.log(jsonResponse);
    //   // return jsonResponse.map(track => {
    //   //   return {
    //   //     id: track.id,
    //   //     name: track.name,
    //   //     artist: track.artists[0].name,
    //   //     album: track.album.name,
    //   //     uri: track.uri
    //   //   }
    //   // });
    // });
  }
}

export default Spotify;
