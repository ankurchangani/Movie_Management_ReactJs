import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../FireBase";

const AddFavoriteAct = (data) => {
    return {
        type: "ADD_FAVORITE",
        payload: data,
    };
};

const getMoviesAct = (data) => {
    return {
        type: "GETMOVIE",
        payload: data
    };
}

const getFaviourteMoviesAct = (data) => {
    return {
        type: "FAVOURITEMOVIE",
        payload: data
    }
}

export const SideBarAct = () => {
    return {
        type: "SIDEBAR_TOOGLE"
    }
}

export const LoadingAct = () => {
    return {
        type: "LOADING"
    }
}

export const ErrorAct = (data) => {
    return {
        type: "ERROR",
        payload: data
    };
}

export const isOpenAct = (data) => {
    return {
        type: "ISOPEN",
        payload: data,
    };
};

export const setSearchQueryAct = (query) => {
    return {
        type: "SET_SEARCH_QUERY",
        payload: query,
    };
};



// Thunk 

// Add favorite Movie
export const AddFavoriteThunk = (data) => async (dispatch) => {

    dispatch(LoadingAct());

    const uid = JSON.parse(localStorage.getItem("uid"));
    data.userid = uid;

    try {
        const res = await getDocs(collection(db, "favorite_movies"));
        const isFavorite = res.docs.some(doc => {
            const movie = doc.data();
            return movie.userid === uid && movie.id === data.id;
        });

        if (isFavorite) return dispatch(ErrorAct("This movie is already in your favorites.")), dispatch(isOpenAct(true));

        await addDoc(collection(db, "favorite_movies"), data);
        dispatch(AddFavoriteAct());
    } catch (err) {
        console.error("Error adding movie:", err);
    }
};

// get Movie
export const getMoviesThunk = () => async dispatch => {
    try {
        const recs = (await getDocs(collection(db, "movies"))).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(getMoviesAct(recs));
        console.log(recs.length > 0 ? "Movies dispatche" : "No matching movies.");
    } catch (err) {
        console.error("Error getting movies:", err);
    }
}


// get Favorite Movie
export const getFavoriteMovies = () => async dispatch => {

    dispatch(LoadingAct());

    try {
        const favoritemovies = (await getDocs(collection(db, "favorite_movies"))).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const uidGet = JSON.parse(localStorage.getItem("uid"));
        const filterRec = favoritemovies.filter(rec => rec.userid === uidGet);
        console.log("filterRec", filterRec);

        setTimeout(() => {
            dispatch(getFaviourteMoviesAct(filterRec));
        }, 2000);

        console.log(filterRec.length > 0 ? "Movies dispatche" : "No matching movies.");

    } catch (err) {
        console.error("Error getting movies:", err);
    }
}

// Delete Item 
export const DeleteFavoriteItemThunk = (id) => async dispatch => {
    try {
        await deleteDoc(doc(db, "favorite_movies", id));
        dispatch(getFavoriteMovies());
    } catch (err) {
        console.error(err);
    }
}
