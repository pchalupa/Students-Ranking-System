import React from 'react';

/**
 * Controls component
 * Render buttons for user and handles inputs.
 */
export default class Controls extends React.Component {
	componentDidMount() {
		this.props.newStep(0);
	}

	/**
	 * Next Step
	 * Handles forward user crawling.
	 */
	nextStep = () => {
		if (this.props.next) {
			this.props.newStep(
				this.props.step < this.props.criteriaLen - 1
					? this.props.step + 1
					: this.props.criteriaLen - 1
			);
		}
	};

	/**
	 * Previous Step
	 * Handles backward user crawling.
	 */
	prevStep = () => {
		// Sets step to step-1 if actual position isn't 1.
		this.props.newStep(this.props.step > 1 ? this.props.step - 1 : 0);
	};

	/**
	 * Save Marks
	 * Sets save props to True.
	 */
	saveMarks = () => {
		this.props.save(true);
	};

	render() {
		/**
		 * Generates "position" dots. "Active" dot gets "active" class.
		 */
		var dots = [];
		for (let i = 0; i < this.props.criteriaLen; i++) {
			i !== this.props.step
				? dots.push(<p key={i}>·</p>)
				: dots.push(
						<p key={i} className={'active'}>
							·
						</p>
				  );
		}

		return (
			<div className={'navi-bar-container'}>
				<button onClick={this.prevStep}>←</button>
				<div className={'dots'}>{dots}</div>
				{this.props.step < this.props.criteriaLen - 1 ? (
					<button onClick={this.nextStep}>→</button>
				) : (
					<button
						name="submit"
						className={'submit-btn'}
						onClick={this.saveMarks}>
						Odeslat
					</button>
				)}
			</div>
		);
	}
}
