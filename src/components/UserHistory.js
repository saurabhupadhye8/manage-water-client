import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTable } from '../actions/userHistory';

const UserHistory = () => {
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.userReducer);
    const userArrayReducer = useSelector(state => state.allWaterDetailsReducer);

    const getUserArray = () => {
        let waterDetails = [];
        if (userArrayReducer && userArrayReducer.userDetailsArray && userArrayReducer.userDetailsArray.length > 0) {
            userArrayReducer.userDetailsArray.forEach(detail => {
                let datePresent = waterDetails.find(data => data.createdAt === detail.createdAt);
                if (!datePresent) {
                    let array = userArrayReducer.userDetailsArray.filter(eachValue => eachValue.createdAt === detail.createdAt);
                    let date = detail.createdAt;
                    const dateSplit = date.split('T')[0].split('-');
                    const day = dateSplit[2];
                    const month = dateSplit[1];
                    const year = dateSplit[0];
                    waterDetails.push({date: `${day}-${month}-${year}`, glasses: array.length, createdAt: detail.createdAt});
                }
            })
        }
        return waterDetails;
    }
    useEffect(() => {
        dispatch(fetchTable(userReducer.user));
    }, [userReducer.user, dispatch])

    const userArray = getUserArray();
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Total Glasses</th>
                </tr>
            </thead>

            <tbody>
                {userArray.map(value => ( 
                    <tr>
                        <td>{value.date}</td>
                        <td>{value.glasses}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserHistory;