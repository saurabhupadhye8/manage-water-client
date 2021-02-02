import React from 'react';
import { useSelector } from 'react-redux';
import empty from '../images/empty.jpg';
import filled from '../images/filled_water_images.jpg';
import { useDispatch } from 'react-redux';
import { drinkWaterGlass } from '../actions/user';

const UserGoal = () => {
	const dispatch = useDispatch();
	const { repeatTime } = useSelector(state => state.waterManagementReducer);
	const userReducer = useSelector(state => state.userReducer);
	let mapWater = repeatTime.map((repeat, index) => (
		<div key={index} style={{ margin: '5%' }} onClick={() => drinkWater(repeat.time)}>
			<div classsName="row">
				{repeat.drank ? (
					<img src={empty} width="14%" height="10%" alt="Drank Water" />
				) : (
					<img src={filled} width="20%" height="20%" alt="Drink Water" />
				)}
			</div>
			<div classsName="row">
				<div>{repeat.time}</div>
			</div>
		</div>
	));
	const drinkWater = time => {
		dispatch(drinkWaterGlass({ drinkTime: time, name: userReducer.user.name }, repeatTime));
	};
	return <div className="row">{mapWater}</div>;
};

export default UserGoal;
