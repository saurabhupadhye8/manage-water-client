let initialState = {
    user: {},
    statusCode: 0,
    errorMessage: ''
}

export const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                user: action.payload.data,
                statusCode: 200,
                errorMessage: ''
            };

        case 'CREATE_USER_FAILURE':
            return {
                ...state,
                user: {},
                statusCode: action.payload.status,
                errorMessage: 'User creation failed.'
            };

        default:
            return state;
    }
}