import firebase from 'firebase/app';
// eslint-disable-next-line
import firestore from 'firebase/firestore';

const settings = {};

const config = {
	apiKey: 'AIzaSyCAJudxoDT6BNo_RGH1n2SuY1DuEae7dG4',
	authDomain: 'mark-app-6d9e2.firebaseapp.com',
	databaseURL: 'https://mark-app-6d9e2.firebaseio.com',
	projectId: 'mark-app-6d9e2',
	storageBucket: 'mark-app-6d9e2.appspot.com',
	messagingSenderId: '791654282280'
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
