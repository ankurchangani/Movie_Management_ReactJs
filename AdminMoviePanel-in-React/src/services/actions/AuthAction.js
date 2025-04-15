import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../../../FireBase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const SignInAct = (data) => {
    return {
        type: "SIGNIN",
        payload: data
    };
};

const SignUpAct = () => {
    return {
        type: "SIGNUP"
    };
};

const SignOutAct = () => {
    return {
        type: "SIGNOUT",
    };
};

const LoginUserGateAct = (data) => {
    return {
        type: "LOGINADMINGATE",
        payload: data
    };
};

export const SignUpBackAct = () => {
    return {
        type: "SIGNUPBACK",
    };
}

const LoadingAct = () => {
    return {
        type: "LOADING",
    };
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


//Thunk

// Sign Up
export const SignUpThunk = (data) => async dispatch => {
    try {
        dispatch(LoadingAct());
        const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName || data.name
        };
        await addDoc(collection(db, "admins"), userData);
        dispatch(SignUpAct());
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.code === "auth/email-already-in-use") {
            errorMessage = "The email address is already in use by another account.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "Please enter a valid email address.";
        }else if (error.code === "auth/weak-password") {
            errorMessage = "The password should be at least 6 characters.";
        } else if (error.code === "auth/missing-email") {
            errorMessage = "Please enter your email.";
        } else if (error.code === "auth/missing-password") {
            errorMessage = "Please enter your password.";
        } else if (error.code) {
            errorMessage = `Error: ${error.message}`;
        }

        dispatch(ErrorAct(errorMessage));
        dispatch(isOpenAct(true));
    }
}

// Sign In
export const SignInThunk = (data) => async dispatch => {
    try {
        dispatch(LoadingAct());
        const res = await signInWithEmailAndPassword(auth, data.email, data.password);
        localStorage.setItem('uid', JSON.stringify(res.user.uid));
        const userdata = {
            displayName: res.user.displayName,
            uid: res.user.uid,
            email: res.user.email
        }
        dispatch(SignInAct(userdata));
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.code === "auth/invalid-credential") {
            errorMessage = "No user found with this email and password please sign up.";
        }else if (error.code === "auth/too-many-requests") {
            errorMessage = "Too many requests detected. Please wait a moment and after try again";
        }else if (error.code === "auth/invalid-email") {
            errorMessage = "Please enter your email.";
        }else if (error.code === "auth/missing-password") {
            errorMessage = "Please enter your password.";
        }else {
            errorMessage = `Error: ${error.message}`;
        }

        dispatch(ErrorAct(errorMessage));
        dispatch(isOpenAct(true));
    }
}

// google Sign In 
export const SignInPoPup = () => async dispatch => {
    try {
        const res = await signInWithPopup(auth, provider);
        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }
        await addDoc(collection(db, "admins"), userData);
        localStorage.setItem("uid", JSON.stringify(res.user.uid));
        dispatch(SignInAct(userData));
    } catch (error) {
        console.error("Sign in error:", error);
    }
}

// logOut(Admin)
export const AdminLogOutThink = () => async dispatch => {
    try {
        await signOut(auth);
        localStorage.removeItem("uid");
        dispatch(SignOutAct());
        return true;
    } catch (error) {
        console.error("Sign out error:", error);
        return false;
    }
};

//Get Admins
export const loginAdminThunk = () => async dispatch => {
    try {
        const recs = (await getDocs(collection(db, "admins"))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        dispatch(LoginUserGateAct(recs));
    } catch (err) {
        console.error("Error get recipes:", err);
    }
}

// signIn Home Page Validation
export const HomeNavigateThunk = () => async dispatch => {
    try {
        const uid = JSON.parse(localStorage.getItem("uid"));
        const res = await getDocs(collection(db, "admins"));
        const userget = res.docs.find(doc => doc.data().uid === uid);
        if (userget) {
            const userData = userget.data();
            console.log("validation", userData);
            dispatch(SignInAct(userData));
        }
    } catch (err) {
        console.error("Error get recipes:", err);
    }
}