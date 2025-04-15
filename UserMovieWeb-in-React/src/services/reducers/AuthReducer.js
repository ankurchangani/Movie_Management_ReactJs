const initialState = {
    users: [],
    user: null,
    isSignIn: false,
    isSignUp: false,
    isLoading: false,
    isCreated: false,
    isOpen : false,
    Error : null
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP":
            return { ...state,  isSignUp: true, isLoading: false, isCreated: true }

        case "SIGNIN":
            return { ...state, user: action.payload, isSignIn: true, isLoading: false, isCreated: false }

        case "LOGINUSERGATE":
            return { ...state, users: action.payload, isSignIn: false, isLoading: false, isCreated: false }

        case "SIGNUPBACK":
            return { ...state, isSignUp: false, isLoading: false, isCreated: false, isSignIn: false }

        case "SIGNOUT":
            return { ...state, user: null, isSignIn: false, isSignUp: false }

        case "ERROR":
            return { ...state, Error: action.payload, isLoading: false, isCreated: false }

        case "ISOPEN":
            return { ...state, isOpen: action.payload }

        case "LOADING":
            return { ...state, isLoading: true }

        default:
            return state;
    }
}