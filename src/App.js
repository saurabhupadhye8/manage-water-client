import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserGoal from './components/UserGoal';
import UserHistory from './components/UserHistory';
import UserDetails from './components/UserDetails';
import { createUser } from './actions/user';
import { useDispatch } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const App = () => {
	const dispatch = useDispatch();
	const [history, setHistory] = useState(false);
	const [showUserHistory, setUserHistory] = useState(false);
	const checkUser = userDetails => {
		dispatch(createUser(userDetails)).then(res => setHistory(res));
    };
    
    const updateHistoryClick = (e) => {
        e.preventDefault();
        setUserHistory(true);
    }

	let pageToRender = showUserHistory ? (
		<div className="row">
			<div className="col s6 l6">
				<UserHistory />
			</div>
			<div className="col s6 l6">
				<UserDetails />
			</div>
		</div>
	) : (
		<div className="row">
			<div className="col s6 l6">
				<UserForm checkUser={checkUser} history={history} updateHistoryClick={updateHistoryClick} />
			</div>
			<div className="col s6 l6">
				<UserGoal checkUser={checkUser} />
			</div>
		</div>
	);

	return <div className="container">{pageToRender}</div>;
};

export default App;
