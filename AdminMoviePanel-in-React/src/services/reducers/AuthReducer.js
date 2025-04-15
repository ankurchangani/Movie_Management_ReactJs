const initialState = {
    admins: [],
    admin: null,
    isSignIn: false,
    isSignUp: false,
    isLoading: false,
    isCreated: false,
    isOpen: false,
    Error: null
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP":
            return { ...state, isSignUp: true, isLoading: false, isCreated: true, isOpen: false }

        case "SIGNIN":
            return { ...state, admin: action.payload, isSignIn: true, isLoading: false, isCreated: false, isOpen: false }

        case "LOGINADMINGATE":
            return { ...state, admins: action.payload, isSignIn: false, isLoading: false, isCreated: false, isOpen: false }

        case "SIGNUPBACK":
            return { ...state, isSignUp: false, isLoading: false, isCreated: false, isSignIn: false, isOpen: false }

        case "SIGNOUT":
            return { ...state, admin: null, isSignIn: false, isSignUp: false }

        case "ERROR":
            return { ...state, Error: action.payload }

        case "ISOPEN":
            return { ...state, isOpen: action.payload, isLoading: false, isCreated: false, isSignIn: false, isSignUp: false };

        case "LOADING":
            return { ...state, isLoading: true }

        default:
            return state;
    }
}