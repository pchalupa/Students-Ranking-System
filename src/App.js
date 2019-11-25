import React from 'react';
import Student from './components/Student/Student';
import Teacher from './components/Teacher/Teacher';
import Notfound from './components/notfound';
import { Route, Switch, HashRouter } from 'react-router-dom';

class App extends React.Component {
	render() {
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
}

export default App;
