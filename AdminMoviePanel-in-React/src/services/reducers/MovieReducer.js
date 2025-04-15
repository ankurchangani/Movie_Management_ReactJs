const initialState = {
    movies: [],
    users: [],
    movie: null,
    menuName : "Dashboard",
    isLoading: false,
    isCreated: false,
    sidebarToogle: false
};


export const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MOVIEADD":
            return { ...state, isCreated: true, isLoading: false }

        case "GETMOVIE":
            return { ...state, movies: action.payload, isLoading: false, isCreated: false}

        case "LOGINUSERGATE":
            return { ...state, users: action.payload, isLoading: false, isCreated: false}

        case "SINGLEITEM" :
            return {...state, movie : action.payload, isLoading: false, isCreated: false}

        case "UPDATEITEM" :
            return {...state, movie : action.payload, isCreated: true, loading: false}

        case "SIDEBAR_TOOGLE":
            return { ...state, sidebarToogle: !state.sidebarToogle }

        case "MENU_NAME":
            return { ...state, menuName: action.payload }

        case "LOADING":
            return { ...state, isLoading: true }

        default:
            return state
    }
}