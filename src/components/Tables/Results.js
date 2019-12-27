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
				var data = this.state.data;
				if (change.type === 'added') {
					Object.values(change.doc.data()).map((criteria, index) => {
						return (data[index].mark =
							data[index].mark + parseInt(criteria.mark));
					});
					this.setState({
						data: data,
						count: snapshot.size
					});
				}
				if (change.type === 'removed') {
					this.setState({
						count: snapshot.size
					});
				}
			});
		});
	}

	getMark = () => {
		let sum = 0;
		this.state.data.map(criteria => {
			return (sum += parseInt(criteria.mark));
		});
		return sum / (this.state.count * this.state.data.length);
	};

	static restartEvaluation = () => {
		firebase
			.firestore()
			.collection('evaluation')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					firebase
						.firestore()
						.collection('evaluation')
						.doc(doc.id)
						.delete();
				});
			});
	};

	render() {
		return (
			<div className={'results-container'}>
				<div className="title">
					<p>Počet hodnocení: {this.state.count}</p>
				</div>
				<div className={'overview-marks'}>
					{this.state.data.map(row => (
						<div key={row['criteria']} className={'criteria-item'}>
							{row['criteria']} :{' '}
							{(row['mark'] / this.state.count).toFixed(2)}
						</div>
					))}
				</div>
				<div className={'final-mark'}>
					Hodnocení
					<br />
					{this.getMark().toFixed(2)}
				</div>
			</div>
		);
	}
}
