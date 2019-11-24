import React from 'react';
import Student from './components/Student/Index';
import Teacher from './components/Teacher/';
import Notfound from './components/notfound';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Student} />
					<Route path="/teacher" component={Teacher} />
					<Route component={Notfound} />
				</Switch>
			</Router>
		);
	}
}

export default App;
