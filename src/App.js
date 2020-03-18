import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Client from './views/Excerises';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import ProtectedRoutes from './hoc/ProtectedRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<ProtectedRoutes>
				<Navbar />

				<Route exact path="/" component={Dashboard} />
				<Route exact path="/excercise" component={Client} />
			</ProtectedRoutes>
		</Switch>
	);
}

export default App;
