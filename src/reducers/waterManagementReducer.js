let initialState = {
    repeatTime: [],
    statusCode: 0,
    errorMessage: ''
}

export const waterManagementReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'WATER_DRINK_TIME':
            return {
                ...state,
                repeatTime: action.payload,
                errorMessage: ''
            }
        case 'DRINK_WATER_SUCCESS':
            return {
                ...state,
                repeatTime: action.payload,
                statusCode: 200,
                errorMessage: ''
            };

        case 'DRINK_WATER_FAILURE':
            return {
                ...state,
                repeatTime: {},
                statusCode: action.payload.status,
                errorMessage: 'Drinking water failed.'
            };

        default:
            return state;
    }
}