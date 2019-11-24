import React from 'react';
import firebase from '../Firebase/';

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
			<div className={'controls-container'}>
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

export default Controls;
