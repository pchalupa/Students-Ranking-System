import React from 'react';
import Marks from './Marks';

class Criteria extends React.Component {
	callbackFunction = resultMark => {
		this.props.resultMark([this.props.name, resultMark]);
	};

	render() {
		return (
			<div className={'criteria-container'}>
				<h2>{this.props.name}</h2>
				<Marks
					pickedMark={this.callbackFunction}
					selectedMark={this.props.selectedMark}
				/>
			</div>
		);
	}
}

export default Criteria;
