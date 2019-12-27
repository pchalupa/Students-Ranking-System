import React from 'react';
import Results from '../Table/Results';

export default class Restart extends React.Component {
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
