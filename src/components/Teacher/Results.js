import React from 'react';
import firebase from '../Firebase/';

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sumMark: 0,
			sumWeight: 0,
			average: 0,
			usersNum: 0,
			criteriaResults: []
		};
	}

	componentDidMount() {
		const db = firebase.firestore().collection('evaluation');
		var criteriaResults = [];
		db.onSnapshot(
			function() {
				db.get().then(
					function(querySnapshot) {
						querySnapshot.forEach(
							function(doc) {
								this.setState({
									sumMark:
										this.state.sumMark +
										doc.data()['mark'] *
											doc.data()['weight'],
									sumWeight:
										this.state.sumWeight +
										doc.data()['weight'],
									average:
										this.state.sumMark /
										this.state.sumWeight
								});
								var contain = false;
								criteriaResults.map(item => {
									if (
										item['criteria'] ===
										doc.data()['criteria']
									) {
										item['mark'] += parseInt(
											doc.data()['mark']
										);
										item['count']++;
										contain = true;
									}
									return 0;
								});
								if (!contain) {
									let item = {
										criteria: doc.data()['criteria'],
										mark: parseInt(doc.data()['mark']),
										count: 1
									};
									criteriaResults = criteriaResults.concat(
										item
									);
								}
								this.setState({
									criteriaResults: criteriaResults
								});
							}.bind(this)
						);
						db.get().then(snap => {
							this.setState({ usersNum: snap.size / 5 });
						});
					}.bind(this)
				);
			}.bind(this)
		);
	}

	render() {
		return (
			<div className={'results-container'}>
				<div className="title">
					<p>Počet hodnocení: {this.state.usersNum.toFixed(0)}</p>
				</div>
				<div className={'overview-marks'}>
					{this.state.criteriaResults.map(row => (
						<div key={row['criteria']} className={'criteria-item'}>
							{row['criteria']} :{' '}
							{(row['mark'] / row['count']).toFixed(2)}
						</div>
					))}
				</div>
				<div className={'final-mark'}>
					Hodnocení
					<br />
					{this.state.average.toFixed(2)}
				</div>
			</div>
		);
	}
}

export default Results;
