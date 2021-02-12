import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTable } from '../actions/userHistory';

const UserHistory = (props) => {
	const dispatch = useDispatch();
	const userReducer = useSelector(state => state.userReducer);
	const userArrayReducer = useSelector(state => state.allWaterDetailsReducer);

	const getUserArray = () => {
		let waterDetails = [];
		if (userArrayReducer && userArrayReducer.userDetailsArray && userArrayReducer.userDetailsArray.length > 0) {
			userArrayReducer.userDetailsArray.forEach(detail => {
				let datePresent = waterDetails.find(data => data.date === detail.createdAt);
				if (!datePresent) {
					let array = userArrayReducer.userDetailsArray.filter(
						eachValue => eachValue.createdAt === detail.createdAt
					);
					waterDetails.push({
						date: detail.createdAt,
						glasses: array.length
					});
				}
			});
		}
		return waterDetails;
    };
    
	useEffect(() => {
		dispatch(fetchTable(userReducer.user));
	}, [userReducer.user, dispatch]);

    const userArray = getUserArray();

    return (
		<div>
			<div>
				<h1 className="indigo-text text-darken-4">User History</h1>
			</div>
			<div style={{margin: '5%'}}>
				<table>
					<thead>
						<tr>
							<th className="center">Date</th>
							<th className="center">Total Glasses</th>
						</tr>
					</thead>
					<tbody>
						{userArray.map(value => (
							<tr>
								<td className="center">{value.date}</td>
								<td className="center">{value.glasses}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
            <div>
                <button className="waves-effect waves-dark btn" onClick={(e) => props.updateHistoryClick(e, false)}>Home Page</button>
            </div>
		</div>
	);
};

export default UserHistory;