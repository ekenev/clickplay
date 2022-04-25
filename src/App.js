import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from './StateProvider';
import Player from './Player';
import { getTokenFromResponse } from './clickplay';
import './App.css';
import Login from './Login';

const s = new SpotifyWebApi();

function App() {
	const [{ token }, dispatch] = useStateValue();

	useEffect(() => {
		// Set token
		const hash = getTokenFromResponse();
		window.location.hash = '';
		let _token = hash.access_token;

		if (_token) {
			s.setAccessToken(_token);

			dispatch({
				type: 'SET_TOKEN',
				token: _token,
			});
		// Set id of playlist 
			s.getPlaylist('37i9dQZF1DX0XUsuxWHRQd').then((response) =>
				dispatch({
					type: 'SET_DISCOVER_WEEKLY',
					discover_weekly: response,
				})
			);
		// Get top artists
			s.getMyTopArtists().then((response) =>
				dispatch({
					type: 'SET_TOP_ARTISTS',
					top_artists: response,
				})
			);

			dispatch({
				type: 'SET_SPOTIFY',
				spotify: s,
			});
// Fetch user
			s.getMe().then((user) => {
				dispatch({
					type: 'SET_USER',
					user,
				});
			});

			s.getUserPlaylists().then((playlists) => {
				dispatch({
					type: 'SET_PLAYLISTS',
					playlists,
				});
			});
		}
	}, [token, dispatch]);

	return (
		// Main entry point of application
		<div className='app'>
			{/* render login page if user is not authenticated or has expired/invalid token */}
			{!token && <Login />}

			{/* If user is authenticated i.e. has valid token, render music player */}
			{token && <Player spotify={s} />}
		</div>
	);
}

export default App;
