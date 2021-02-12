import axios from 'axios';
const url = 'https://water-management-server.herokuapp.com';

export const fetchTable = (userObject) => async (dispatch) => {
    try {
        const data = await axios.post(`${url}/water/getAllDetails`, userObject)
        if (data.status === 200) {
            dispatch({ type:'GET_WATER_DETAILS_SUCCESS', payload: data });
        } else {
            dispatch({ type:'GET_WATER_DETAILS_FAILURE', payload: data });
        }
    } catch(error) {
        dispatch({ type:'GET_WATER_DETAILS_FAILURE', payload: error });
    }
}