import React from 'react';
import firebase from '../Firebase';
import { criteriaList } from '../../data/data';

export default class Results extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			data: []
		};
	}

	componentDidMount() {
		this.setState({
			data: criteriaList
		});

		const db = firebase.firestore().collection('evaluation');

		db.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if (change.type === 'added') {
					let data = this.state.data;
					Object.values(change.doc.data()).map((mark, index) => {
						return (data[index].mark = data[index].mark + mark);
					});
					this.setState({
						data: data,
						count: snapshot.size
					});
				}
			});
		});
	}

	getMark = sumMark => {
		return this.state.count > 0
			? (sumMark / this.state.count).toFixed(2)
			: 0;
	};

	getResultMark = () => {
		let sum = 0;
		this.state.data.map(criteria => {
			return (sum += criteria.mark);
		});
		return this.state.count > 0
			? (sum / (this.state.count * this.state.data.length)).toFixed(2)
			: 0;
	};

	restartEvaluation = () => {
		const db = firebase.firestore().collection('evaluation');
		db.get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				db.doc(doc.id).delete();
			});

			let data = this.state.data;
			data.map(criteria => {
				return (criteria.mark = 0);
			});

			this.setState({
				data: data,
				count: 0
			});
		});
	};

	render() {
		return (
			<>
				<div className={'results-container'}>
					<div className="title">
						<p>Počet hodnocení: {this.state.count}</p>
					</div>
					<div className={'overview-marks'}>
						{this.state.data.map(results => (
							<div
								key={results['criteria']}
								className={'criteria-item'}>
								{results['criteria']}:
								{' ' + this.getMark(results['mark'])}
							</div>
						))}
					</div>
					<div className={'final-mark'}>
						Hodnocení
						<br />
						{this.getResultMark()}
					</div>
				</div>
				<div className={'controls-container'}>
					<button
						name="submit"
						className={'submit-btn'}
						onClick={this.restartEvaluation}>
						Restart
					</button>
				</div>
			</>
		);
	}
}
