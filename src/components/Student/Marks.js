import React from 'react';

class Marks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scale: [
				{ name: '1', value: '1' },
				{ name: '2', value: '2' },
				{ name: '3', value: '3' },
				{ name: '4', value: '4' },
				{ name: '5', value: '5' }
			]
		};
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

export default Marks;
