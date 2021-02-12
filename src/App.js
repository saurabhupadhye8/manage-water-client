import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserGoal from './components/UserGoal';
import UserHistory from './components/UserHistory';
import UserDetails from './components/UserDetails';
import { createUser } from './actions/user';
import { useDispatch, useSelector } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const App = () => {
	const dispatch = useDispatch();
	const [history, setHistory] = useState(false);
	const [showUserHistory, setUserHistory] = useState(false);
	const checkUser = userDetails => {
		dispatch(createUser(userDetails)).then(res => setHistory(res));
	};
	const userReducer = useSelector(state => state.userReducer);
    
    const updateHistoryClick = (e, value) => {
        e.preventDefault();
        setUserHistory(value);
    }

	let pageToRender = showUserHistory ? (
		<div className="row">
			<div className="col s6 l6 center">
				<UserHistory updateHistoryClick={updateHistoryClick} />
			</div>
			<div className="col s6 l6 center">
				<UserDetails />
			</div>
		</div>
	) : (
		<div className="row">
			<div className="col s6 l6 center">
				<UserForm checkUser={checkUser} history={history} updateHistoryClick={updateHistoryClick} userReducer={userReducer} />
			</div>
			<div className="col s6 l6 center">
				<UserGoal checkUser={checkUser} history={history} />
			</div>
		</div>
	);

	return <div className="container">{pageToRender}</div>;
};

export default App;
