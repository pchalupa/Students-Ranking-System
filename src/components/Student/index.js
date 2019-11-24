import React from 'react';
import firebase from '../Firebase/';
import './styles/main.scss';

class Student extends React.Component {
	constructor(props) {
		super(props);
		this.db = firebase.firestore().collection('evaluation');
		this.saveMarks = this.saveMarks.bind(this);
		this.setStep = this.setStep.bind(this);
		this.state = {
			data: [
				{ criteria: 'Postoj', mark: '', weight: 1 },
				{ criteria: 'Informace', mark: '', weight: 1 },
				{ criteria: 'Oblečení', mark: '', weight: 1 },
				{ criteria: 'Vlasy', mark: '', weight: 1 },
				{ criteria: 'Obecné', mark: '', weight: 1 }
			],
			sent: false,
			step: 0
		};
	}

	componentDidMount() {
		localStorage.setItem('step', 0);
	}

	setStep(newStep) {
		this.setState({ step: newStep });
	}

	saveMarks() {
		if (this.checkFill()) {
			this.state.data.map(criteria => {
				this.db.add(criteria);
				return true;
			});
			this.setState({ sent: true });
		}
	}

	checkFill() {
		this.state.data.map(criteria => {
			if (criteria['mark'] === '') {
				return false;
			} else {
				return true;
			}
		});
		return true;
	}

	onAddResult = result => {
		this.state.data.map(item => {
			if (item['criteria'] === result[0]) {
				item['mark'] = result[1];
			}
			this.state.step < this.state.data.length - 1
				? this.setStep(this.state.step + 1)
				: this.setStep(this.state.data.length - 1);
			return true;
		});
	};

	render() {
		var criteriaList = [];
		this.state.data.map(data => {
			criteriaList.push(
				<Criteria
					key={data['criteria']}
					name={data['criteria']}
					resultMark={this.onAddResult}
				/>
			);
			return true;
		});
		return (
			<div
				className={'App container'}
				style={{ height: window.innerHeight + 'px' }}>
				<div className={'title'}>Hodnocení žáků</div>
				{!this.state.sent ? criteriaList[this.state.step] : 'Odesláno'}
				{!this.state.sent ? (
					<Navi
						step={this.state.step}
						newStep={this.setStep}
						criteriaLen={this.state.data.length}
						next={true}
						save={this.saveMarks}
					/>
				) : (
					''
				)}
			</div>
		);
	}
}

export default Student;

class Criteria extends React.Component {
	constructor(props) {
		super(props);
		this.callbackFunction = this.callbackFunction.bind(this);
	}

	callbackFunction(resultMark) {
		this.props.resultMark([this.props.name, resultMark]);
	}

	render() {
		return (
			<div className={'criteria-container'}>
				<h2>{this.props.name}</h2>
				<Marks selectedMark={this.callbackFunction} />
			</div>
		);
	}
}

class Marks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			scale: [
				{ name: '1', value: '1' },
				{ name: '2', value: '2' },
				{ name: '3', value: '3' },
				{ name: '4', value: '4' }
			]
		};
	}

	sendData(e, mark) {
		this.props.selectedMark(mark);
		this.setState({ active: mark });
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
								option['value'] === this.state.active
									? 'mark-selector active-mark'
									: 'mark-selector'
							}
							onClick={e => this.sendData(e, option['value'])}>
							{option['name']}
						</button>
					);
				})}
			</div>
		);
	}
}

class Navi extends React.Component {
	constructor(props) {
		super(props);
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.saveMarks = this.saveMarks.bind(this);
	}

	componentDidMount() {
		this.props.newStep(0);
	}

	nextStep() {
		if (!this.props.next) {
			this.props.newStep(
				this.props.step < this.props.criteriaLen - 1
					? this.props.step + 1
					: this.props.criteriaLen - 1
			);
		}
	}

	prevStep() {
		this.props.newStep(!this.props.step > 1 ? this.props.step - 1 : 0);
	}

	saveMarks() {
		this.props.save(true);
	}

	render() {
		var dots = [];
		for (var i = 0; i < this.props.criteriaLen; i++) {
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
