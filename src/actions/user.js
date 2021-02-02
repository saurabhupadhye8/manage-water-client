import axios from 'axios';
const url = 'http://localhost:5000';

export const createUser = (userObject) => async (dispatch) => {
    try {
        const data = await axios.post(`${url}/user/create`, userObject)
            if (data.status === 200) {
                const calculateTime = (splittedTime, waterGap) => {
                    let firstGlassMinutes = parseInt(splittedTime[1]) + waterGap;
                    let firstGlassHours = parseInt(splittedTime[0]);
                    const firstGlassDecimal = firstGlassMinutes / 60;
                    if (firstGlassDecimal > 0.99) {
                        firstGlassHours += Math.floor(firstGlassDecimal);
                        firstGlassHours = firstGlassHours > 23 ? firstGlassHours-24 : firstGlassHours;
                        firstGlassMinutes = Math.round((firstGlassDecimal - Math.floor(firstGlassDecimal)) * 60);
                    }
                    return `${firstGlassHours}:${firstGlassMinutes}`;
                }
            
                const convert = (firstGlassTime) => {
                    let splitTime = firstGlassTime.split(":");
                    let hour = parseInt(splitTime[0]) < 10 ? '0' + splitTime[0] : splitTime[0];
                    let minutes = parseInt(splitTime[1]) < 10 ? '0' + splitTime[1] : splitTime[1];
                    debugger
                    if (parseInt(splitTime[0]) > 12) {
                        hour = splitTime[0] - 12 < 10 ? '0' + (splitTime[0] - 12) : splitTime[0] - 12;
                        return `${hour}:${minutes} PM`
                    } else {
                        return `${hour}:${minutes} AM`
                    }
                }
                // const userReducer = useSelector(state => state.userReducer);
                let goal = data && data.data && data.data.goal ? data.data.goal : 0;
                let repeatTime = [];
                if (goal > 0) {
                    const user = { ...data.data };
                    const startTimeSplit = user.startTime.split(':');
                    const startTimeMinutes = parseInt(startTimeSplit[0]) * 60;
                    const totalStartTime = startTimeMinutes + parseInt(startTimeSplit[1]);
            
                    const endTimeSplit = user.endTime.split(':');
                    const endTimeMinutes = parseInt(endTimeSplit[0]) * 60;
                    const totalEndTime = endTimeMinutes + parseInt(endTimeSplit[1]);
                    let totalWorkTime;
                    if (totalStartTime < totalEndTime) {
                        totalWorkTime = totalEndTime - totalStartTime;
                    } else {
                        totalWorkTime = 1440 - totalStartTime + totalEndTime;
                    }
            
                    const goalForWorkTime = Math.round((goal / 1440) * totalWorkTime);
                    const waterGap = Math.floor(totalWorkTime / goalForWorkTime);
                    let firstGlassTime = calculateTime(startTimeSplit, waterGap);
                    const convertTime = convert(firstGlassTime);
                    repeatTime.push({time: convertTime, drank: false});
            
                    if (goalForWorkTime > 1) {
                        for (let i = 0; i < Math.floor(goalForWorkTime); i++) {
                            firstGlassTime = calculateTime(firstGlassTime.split(':'), waterGap);
                            let convertTime = convert(firstGlassTime);
                            repeatTime.push({time: convertTime, drank: false})
                        }
                    }
                }
                dispatch({ type:'CREATE_USER_SUCCESS', payload: data });
                dispatch({type: 'WATER_DRINK_TIME', payload: repeatTime});
                return true;
            } else {
                dispatch({ type: 'CREATE_USER_FAILED', payload: data });
                return false;
            }
    } catch (error) {
        dispatch({type: 'CREATE_USER_FAILED', payload: error});
        return false;
    }
}

export const drinkWaterGlass = (time, repeatTimeArray) => async (dispatch) => {
    try {
        const data = await axios.post(`${url}/water/drinkWater`, time)
        debugger
        if (data.status === 200) {
            debugger
            let repeatTime = [...repeatTimeArray];
            repeatTime.forEach(repeat => {
                if (repeat.time === data.data.drinkTime) {
                    repeat.drank = true;
                }
            })
            dispatch({type: 'DRINK_WATER_SUCCESS', payload: repeatTime});
        } else {
            dispatch({type: 'DRINK_WATER_FAILED', payload: data});
        }
    } catch (error) {
        dispatch({type: 'DRINK_WATER_FAILED', payload: error});
    }
}