import React from 'react';
import firebase from '../Firebase/';
import './styles/main.scss';

class Teacher extends React.Component {
	constructor(props) {
		super(props);
		this.db = firebase.firestore().collection('evaluation');
		this.state = {
			validate: localStorage.getItem('validate')
		};
	}

	render() {
		return (
			<div
				className={'App container'}
				style={{ height: window.innerHeight + 'px' }}>
				<div className={'title'}>
					<h1>Učitel</h1>
				</div>
				<Results />
				<Controls />
			</div>
		);
	}
}

export default Teacher;

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
								console.log(criteriaResults);
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
				<div>
					<h2>Kritéria hodnocení</h2>
					{this.state.criteriaResults.map(row => (
						<div key={row['criteria']} className={'criteria-item'}>
							{row['criteria']} :{' '}
							{(row['mark'] / row['count']).toFixed(2)}
						</div>
					))}
				</div>
				<div>Hodnocení: {this.state.average.toFixed(2)}</div>
				<div>Počet hodnocení: {this.state.usersNum.toFixed(0)}</div>
			</div>
		);
	}
}

class Controls extends React.Component {
	restartEvaluation() {
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
		//this.setState({ sumMark: 0, sumWeight: 0, average: 0, usersNum: 0 });
	}

	render() {
		return (
			<div>
				<button
					name="submit"
					className={'submit-btn'}
					onClick={this.restartEvaluation}>
					Restart
				</button>
			</div>
		);
	}
}
