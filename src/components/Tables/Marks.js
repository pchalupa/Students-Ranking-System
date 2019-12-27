import React from 'react';
import { scaleList } from '../../data/data';

export default class Marks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scale: []
		};
	}

	componentDidMount() {
		this.setState({
			scale: scaleList
		});
	}

	sendData(e, mark) {
		this.props.pickedMark(mark);
	}

	render() {
		return (
			<div className={'mark-container'}>
				{this.state.scale.map(option => {
					return (
						<button
							key={option['name']}
							name={option['name']}
							className={
								option['value'] === this.props.selectedMark
									? 'mark-selector active-mark'
									: 'mark-selector'
							}
							onClick={e => this.sendData(e, option['value'])}>
							<span>{option['name']}</span>
						</button>
					);
				})}
			</div>
		);
	}
}
