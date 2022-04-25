import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { getTokenFromResponse } from './clickplay';
import { useStateValue } from './StateProvider';

function Sidebar() {
	// get state hook
	const [{ playlists }, dispatch] = useStateValue();
	console.log(playlists);

	return (
		<div className='sidebar'>
			{/* Alt text helps improve accessibility for visually impaired individuals */}
			<img className='sidebar__logo' src='logo.png' alt='Clickplay' />
			<SidebarOption Icon={HomeIcon} option='Home' />
			<SidebarOption Icon={SearchIcon} option='Search' />
			<SidebarOption Icon={LibraryMusicIcon} option='Your Library' />
			<br />
			<strong className='sidebar__title'>PLAYLISTS</strong>
			<hr />
			{/* looping over playlist if playlist data is not an empty array */}
			{playlists?.items?.map((playlist) => (
				<SidebarOption option={playlist.name} />
			))}
		</div>
	);
}

export default Sidebar;
