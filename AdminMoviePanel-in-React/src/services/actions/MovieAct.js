import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../FireBase";

const MovieAddAct = () => {
    return {
        type: "MOVIEADD",
    };
}

const getMoviesAct = (data) => {
    return {
        type: "GETMOVIE",
        payload: data
    };
}

const getLoginUsers = (data) => {
    return {
        type: "LOGINUSERGATE",
        payload: data
    }
}

const SingleItemAct = (data) => {
    return {
        type: "SINGLEITEM",
        payload: data
    }
}

const UpdateItemsAct = (data) => {
    return {
        type: "UPDATEITEM",
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

export const MenuNameAct = (name) => {
    return {
        type: "MENU_NAME",
        payload: name
    }
}


// Thunk 


// Add Movie
export const MovieAddThunk = (data) => async (dispatch) => {
    dispatch(LoadingAct());
    const uidGet = JSON.parse(localStorage.getItem("uid"));
    if (!uidGet) console.error("User not authenticated.");
    try {
        data.uid = uidGet;
        await addDoc(collection(db, "movies"), data);
        setTimeout(() => {
            dispatch(MovieAddAct());
        },2000);
        console.log("Movie added successfully.");
    } catch (err) {
        console.error("Error adding movie:", err);
    }
};

// get Movie
export const getMoviesThunk = () => async dispatch => {
    dispatch(LoadingAct());
    try {
        const recs = (await getDocs(collection(db, "movies"))).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const uidGet = JSON.parse(localStorage.getItem("uid"));
        const filterRec = recs.filter(rec => rec.uid === uidGet);
        console.log("filterRec", filterRec);
        setTimeout(() => {
            dispatch(getMoviesAct(filterRec));
        },2000);
        console.log(filterRec.length > 0 ? "Movies dispatche" : "No matching movies.");

    } catch (err) {
        console.error("Error getting movies:", err);
    }
}


// get user 
export const LoginUserGateThunk = () => async dispatch => {
    dispatch(LoadingAct())
    try {
        const recs = (await getDocs(collection(db, "favorite_movies"))).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const uidGet = JSON.parse(localStorage.getItem("uid"));
        const filterRec = recs.filter(rec => rec.uid === uidGet);

        const UsersReco = (await getDocs(collection(db, "users"))).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Users record", UsersReco);

        const matchedUsers = UsersReco.filter(user =>
            filterRec.some(rec => rec.userid === user.uid)
        );

        console.log("Matched Users", matchedUsers);
        setTimeout(() => {
            dispatch(getLoginUsers(matchedUsers));
        },2000)
    } catch (err) {
        console.error("Error getting user:", err);
    }
}

//Single Movie
export const SingleItemThunk = (id) => async dispatch => {
    try {
        const rec = await getDoc(doc(db, "movies", id));
        let getData = rec.data();
        getData.id = rec.id;
        dispatch(SingleItemAct(getData));
    } catch (err) {
        console.error("Single movie", err);
    }
}

// update items
export const UpdateItemsThunk = (data) => async dispatch => {
    dispatch(LoadingAct());
    try {
        await setDoc(doc(db, "movies", data.id), data);
        setTimeout(() => {
            dispatch(UpdateItemsAct(data));
        },2000);
        console.log("Movie updated successfully.");
    } catch (err) {
        console.error("Error updating movie:", err);
    }
}

// Delete Item 
export const DeleteItemThunk = (id) => async dispatch => {
    try {
        await deleteDoc(doc(db, "movies", id));
        dispatch(getMoviesThunk());
    } catch (err) {
        console.error(err);
    }
}