import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../../FireBase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

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
        await updateProfile(res.user, { displayName: data.name });
        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: data.name
        };
        await setDoc(doc(db, "admins", res.user.uid), userData);
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
        
        // Fetch matching admin document to verify authorization
        const adminDocRef = doc(db, "admins", res.user.uid);
        const adminDoc = await getDoc(adminDocRef);
        
        if (!adminDoc.exists()) {
            await signOut(auth);
            throw { code: "auth/not-an-admin", message: "You are not authorized as an administrator." };
        }
        
        const userData = adminDoc.data();
        localStorage.setItem('uid', JSON.stringify(res.user.uid));
        dispatch(SignInAct(userData));
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.code === "auth/not-an-admin") {
            errorMessage = error.message;
        } else if (error.code === "auth/invalid-credential") {
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

// Forget Password
export const ForgetPasswordThunk = (email, onSuccess, onError) => async dispatch => {
    try {
        dispatch(LoadingAct());
        await sendPasswordResetEmail(auth, email);
        if (onSuccess) onSuccess();
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";
        if (error.code === "auth/user-not-found") {
            errorMessage = "No user found with this email address.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/missing-email") {
            errorMessage = "Please enter your email address.";
        } else {
            errorMessage = error.message;
        }
        dispatch(ErrorAct(errorMessage));
        dispatch(isOpenAct(true));
        if (onError) onError(errorMessage);
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
        if (!uid) return;
        
        const adminDocRef = doc(db, "admins", uid);
        const adminDoc = await getDoc(adminDocRef);
        
        if (adminDoc.exists()) {
            const userData = adminDoc.data();
            console.log("validation", userData);
            dispatch(SignInAct(userData));
        } else {
            localStorage.removeItem("uid");
            dispatch(SignOutAct());
        }
    } catch (err) {
        console.error("Error verifying admin navigation:", err);
    }
}