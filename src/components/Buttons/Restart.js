import React from 'react';
import Results from '../Tables/Results';

export default function Restart() {
	return (
		<div className={'controls-container'}>
			<button
				name="submit"
				className={'submit-btn'}
				onClick={Results.restartEvaluation}>
				Restart
			</button>
		</div>
	);
}
