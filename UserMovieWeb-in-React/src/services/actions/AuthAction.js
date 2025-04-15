import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { auth, db, provider } from "../../../FireBase";
  import { addDoc, collection, getDocs } from "firebase/firestore";
  
  // Actions
  const SignInAct = (data) => ({ type: "SIGNIN", payload: data });
  const SignUpAct = () => ({ type: "SIGNUP" });
  const SignOutAct = () => ({ type: "SIGNOUT" });
  const LoginUserGateAct = (data) => ({ type: "LOGINUSERGATE", payload: data });
  export const SignUpBackAct = () => ({ type: "SIGNUPBACK" });
  const LoadingAct = () => ({ type: "LOADING" });
  export const ErrorAct = (data) => ({ type: "ERROR", payload: data });
  export const isOpenAct = (data) => ({ type: "ISOPEN", payload: data });
  
  // ✅ Sign Up Thunk
  export const SignUpThunk = (data) => async (dispatch) => {
    try {
      dispatch(LoadingAct());
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || data.name,
      };
  
      await addDoc(collection(db, "users"), userData);
      localStorage.setItem("uid", JSON.stringify(res.user.uid));
      dispatch(SignUpAct());
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
  
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "The email address is already in use by another account.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
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
  };
  
  // ✅ Sign In Thunk
  export const SignInThunk = (data) => async (dispatch) => {
    try {
      dispatch(LoadingAct());
      const res = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
      };
  
      localStorage.setItem("uid", JSON.stringify(res.user.uid));
      dispatch(SignInAct(userData));
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
  
      if (error.code === "auth/invalid-credential") {
        errorMessage = "No user found with this email and password. Please sign up.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests detected. Please wait a moment and try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter your email.";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Please enter your password.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
  
      dispatch(ErrorAct(errorMessage));
      dispatch(isOpenAct(true));
    }
  };
  
  // ✅ Google Sign-In
  export const SignInPoPup = () => async (dispatch) => {
    try {
      const res = await signInWithPopup(auth, provider);
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
  
      // Check if user already exists
      const existingUser = (
        await getDocs(collection(db, "users"))
      ).docs.find((doc) => doc.data().uid === res.user.uid);
  
      if (!existingUser) {
        await addDoc(collection(db, "users"), userData);
      }
  
      localStorage.setItem("uid", JSON.stringify(res.user.uid));
      dispatch(SignInAct(userData));
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };
  
  
  export const AdminLogOutThink = () => async (dispatch) => {
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

  export const loginAdminThunk = () => async (dispatch) => {
    try {
      const recs = (await getDocs(collection(db, "users"))).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(LoginUserGateAct(recs));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  
  // ✅ Validate User on App Start (Home Page)
  export const HomeNavigateThunk = () => async (dispatch) => {
    try {
      const uid = JSON.parse(localStorage.getItem("uid"));
      const res = await getDocs(collection(db, "users"));
      const userDoc = res.docs.find((doc) => doc.data().uid === uid);
  
      if (userDoc) {
        const userData = userDoc.data();
        dispatch(SignInAct(userData));
      }
    } catch (err) {
      console.error("Error during user session validation:", err);
    }
  };
  