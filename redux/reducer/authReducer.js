const initialState = {
    user: null,
    errorLogin: null,
    checkLogin: false,
    loading: false,
    department: [],
    errorDepartment: null,
    rememberMe: false,
};
export default authReducer = (state = initialState, action) => {
    switch (action.type) {

        //POST LOGIN
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                errorLogin: action.payload,
            };
        case 'CHECK_LOGIN':
            return {
                ...state,
                checkLogin: action.payload,
            };
        // case 'REMEMBER_LOGIN':
        //     return {
        //         ...state,
        //         rememberMe: action.payload,
        //     }
        //GET DATA DEPARTMENT
        case 'FETCH_DATA_REQUEST':
            return { ...state, loading: action.payload };

        case 'FETCH_DEPARTMENT_SUCCESS':
            return {
                ...state,
                department: action.payload,
            };
        case 'FETCH_DEPARTMENT_FAILURE':
            return {
                ...state,
                errorDepartment: action.payload,
            };
        default:
            return state;
    }
};
