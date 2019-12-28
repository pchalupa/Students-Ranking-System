import React from 'react';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Notfound from './components/notfound';
import { Route, Switch, HashRouter } from 'react-router-dom';

export default function App() {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Student} />
				<Route path="/teacher" component={Teacher} />
				<Route component={Notfound} />
			</Switch>
		</HashRouter>
	);
}
