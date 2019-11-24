import React from 'react';
import firebase from '../Firebase';
import Controls from './Controls';
import Results from './Results';
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
			<div className={'App container'}>
				<h1 className={'title'}>Výsledky hodnocení</h1>
				<Results />
				<Controls />
			</div>
		);
	}
}

export default Teacher;
