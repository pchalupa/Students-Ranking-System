import React from 'react';
import Results from '../components/Tables/Results';

export default function Teacher() {
	return (
		<div className={'App container'}>
			<h1 className={'title'}>Výsledky hodnocení</h1>
			<Results />
		</div>
	);
}
