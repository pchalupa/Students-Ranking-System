import React from 'react';
import firebase from '../components/Firebase';
import Controls from '../components/Navigation/Controls';
import Criteria from '../components/Tables/Criteria';
import Thanks from '../components/Images/Thanks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { criteriaList } from '../data/data';

export default class Student extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			sent: false,
			step: 0
		};
	}

	componentDidMount() {
		this.setState({
			data: criteriaList
		});
	}

	setStep = newStep => {
		this.setState({ step: newStep });
	};

	saveMarks = () => {
		if (this.checkFill()) {
			// Array to object
			let result = {};
			this.state.data.map((criteria, index) => {
				return (result[index] = criteria.mark);
			});

			const db = firebase.firestore().collection('evaluation');
			db.add(result);
			this.setState({ sent: true });
		}
	};

	checkFill = () => {
		let result = true;
		this.state.data.map(criteria => {
			if (criteria['mark'] === 0) {
				result = false;
			}
			return result;
		});
		return result;
	};

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
				{!this.state.sent ? criteriaList[this.state.step] : <Thanks />}
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
