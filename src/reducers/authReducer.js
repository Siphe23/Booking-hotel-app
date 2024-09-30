const initialState = {
    user: null,
    role: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.payload.user, role: action.payload.role };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, role: null, loading: false, error: null };
        default:
            return state;
    }
};

export default authReducer;