import React from 'react';
import './Login.css';
import { accessUrl } from './clickplay';

function Login() {
	return (
		<div className='login'>
			<img src='/logo.png' alt='' />
			<a href={accessUrl} className='btn'>
				LOGIN TO CLICKPLAY
			</a>
		</div>
	);
}

export default Login;
