import React from 'react';
import './Popup.css';

const Popup = ({ setFormSubmitted }) => {
	return (
		<div className='popup'>
			<h2>Registration completed!</h2>
			<h3>Welcome to the team!</h3>
			<button className='popup-btn' onClick={() => setFormSubmitted(false)}>Back</button>
		</div>
	);
};

export default Popup;
