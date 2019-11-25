import React from 'react';
import firebase from '../Firebase';
import Controls from './Controls';
import Criteria from './Criteria';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles/main.scss';

class Student extends React.Component {
	constructor(props) {
		super(props);
		this.db = firebase.firestore().collection('evaluation');
		this.saveMarks = this.saveMarks.bind(this);
		this.setStep = this.setStep.bind(this);
		this.state = {
			data: [
				{ criteria: 'Nadpis', mark: '', weight: 1 },
				{ criteria: 'Obsah', mark: '', weight: 1 },
				{ criteria: 'Grafická úprava', mark: '', weight: 1 },
				{ criteria: 'Projev', mark: '', weight: 1 },
				{ criteria: 'Zdroje', mark: '', weight: 1 },
				{ criteria: 'Čas', mark: '', weight: 1 }
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
		let result = true;
		this.state.data.map(criteria => {
			if (criteria['mark'] === '') {
				result = false;
			}
			return result;
		});
		return result;
	}

	onAddResult = result => {
		this.state.data.map(item => {
			if (item['criteria'] === result[0]) {
				item['mark'] = result[1];
			}
			// After user add result, step will increment by 1
			this.state.step < this.state.data.length - 1
				? this.setStep(this.state.step + 1)
				: this.setStep(this.state.data.length - 1);
			return true;
		});
	};

	Thanks() {
		return (
			<div className={'thanks-container'}>
				<h2>Hodnocení bylo odesláno</h2>
				<img
					className={'thanks'}
					src={require('./assets/thanks.gif')}
					alt={'thanks'}
				/>
			</div>
		);
	}

	render() {
		var criteriaList = [];
		this.state.data.map(data => {
			criteriaList.push(
				<TransitionGroup>
					<CSSTransition
						key={this.state.step}
						timeout={250}
						classNames="slide">
						<Criteria
							key={data['criteria']}
							name={data['criteria']}
							resultMark={this.onAddResult}
							selectedMark={data['mark']}
						/>
					</CSSTransition>
				</TransitionGroup>
			);
			return true;
		});
		return (
			<div className={'App container'}>
				<h1 className={'title'}>Hodnocení</h1>
				{!this.state.sent
					? criteriaList[this.state.step]
					: this.Thanks()}
				{!this.state.sent ? (
					<Controls
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