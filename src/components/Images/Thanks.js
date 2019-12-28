import React from 'react';

export default function Thanks() {
	return (
		<div className={'thanks-container'}>
			<h2>Hodnocení bylo odesláno</h2>
			<img
				className={'thanks'}
				src={require('../../assets/Images/thanks.gif')}
				alt={'thanks'}
			/>
		</div>
	);
}
