import React from 'react';
import { useSelector } from 'react-redux';
import empty from '../images/empty.jpg';
import filled from '../images/filled_water_images.jpg';
import { useDispatch } from 'react-redux';
import { drinkWaterGlass } from '../actions/user';

const UserGoal = (props) => {
	const dispatch = useDispatch();
	const { repeatTime } = useSelector(state => state.waterManagementReducer);
	const userReducer = useSelector(state => state.userReducer);
	let mapWater = repeatTime.map((repeat, index) => (
		<div key={index} >
		<div className="col s3 l4">
			<div classsName="row">
				{repeat.drank ? (
					<img src={empty} width="60%" height="100%" alt="Drank Water" onClick={() => drinkWater(repeat.time)} />
				) : (
					<img src={filled} width="100%" height="100%" alt="Drink Water" onClick={() => drinkWater(repeat.time)} />
				)}
			</div>
			<div classsName="row">
				<div>{repeat.time}</div>
			</div>
			</div>
		</div>
	));
	const drinkWater = time => {
		const date = new Date();
		const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
		const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
		const year = date.getFullYear();
		const createdAt = `${day}-${month}-${year}`
		dispatch(drinkWaterGlass({ drinkTime: time, name: userReducer.user.name, createdAt }, repeatTime));
	};
	return <div className="row" style={{marginTop: '20%'}}>{repeatTime.length > 0 ? mapWater : props.history ? (<h2 style={{marginTop:'50%', marginLeft:'10%'}}>No need to drink water!!</h2>) : <div />}</div>;
};

export default UserGoal;
