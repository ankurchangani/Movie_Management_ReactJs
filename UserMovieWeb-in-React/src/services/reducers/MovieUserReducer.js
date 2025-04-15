const initialState = {
    movies: [],
    favoriteMovies: [],
    movie: null,
    isLoading: false,
    isCreated: false,
    sidebarToogle: false,
    Error: null,
    isOpen: false,
    searchQuery: "", // <-- Added searchQuery
};

export const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            return { ...state, isCreated: true, isLoading: false };

        case "GETMOVIE":
            return { ...state, movies: action.payload, isLoading: false, isCreated: false };

        case "FAVOURITEMOVIE":
            return { ...state, favoriteMovies: action.payload, isLoading: false, isCreated: false };

        case "SINGLEITEM":
            return { ...state, movie: action.payload, isLoading: false, isCreated: false };

        case "SIDEBAR_TOOGLE":
            return { ...state, sidebarToogle: !state.sidebarToogle };

        case "ERROR":
            return { ...state, Error: action.payload, isLoading: false, isCreated: false };

        case "ISOPEN":
            return { ...state, isOpen: action.payload };

        case "LOADING":
            return { ...state, isLoading: true };

        case "SET_SEARCH_QUERY": // <-- Added search query case
            return { ...state, searchQuery: action.payload };

        default:
            return state;
    }
};
