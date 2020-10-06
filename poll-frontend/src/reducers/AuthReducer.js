export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.userId,
            };

        case "LOGGED_OUT":
            return null;
        default:
            return state;
    }
};
