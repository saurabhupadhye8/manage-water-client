let initialState = {
	userDetailsArray: [],
	statusCode: 0,
	errorMessage: '',
};

export const allWaterDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
        case 'GET_WATER_DETAILS_SUCCESS':
			return {
				...state,
				userDetailsArray: action.payload.data,
				statusCode: 200,
				errorMessage: '',
			};

		case 'GET_WATER_DETAILS_FAILURE':
			return {
				...state,
				userDetailsArray: [],
				statusCode: action.payload.status,
				errorMessage: 'Fetch water details failed.',
			};

		default:
			return state;
	}
};
