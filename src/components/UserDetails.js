import React from 'react';
import { useSelector } from 'react-redux';

const UserDetails = () => {
    let userReducer = useSelector(state => state.userReducer);
    return (
        <div>
            <h1 className="indigo-text text-darken-4">User Details</h1>
            {userReducer && userReducer.user ? (
                <div>
                    <div className="row">
                        Name: {userReducer.user.name}
                    </div>
                    <div className="row">
                        Work Start Time: {userReducer.user.startTime}
                    </div>
                    <div className="row">
                        Work End Time: {userReducer.user.endTime}
                    </div>
                    <div className="row">
                        Weight: {userReducer.user.weight}
                    </div>
                    <div className="row">
                        Goal: {userReducer.user.goalForWorkTime} Glass Water
                    </div>
                </div>
            ) : (<div />)}
        </div>
    )
}

export default UserDetails;