import React from 'react';
import Results from './Results';

class Controls extends React.Component {
	render() {
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
}

export default Controls;
