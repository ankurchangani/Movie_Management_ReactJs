import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  isOpenAct,
  SignInPoPup,
  SignInThunk,
  SignUpBackAct,
} from "../services/actions/AuthAction";
import GoogleIcon from '@mui/icons-material/Google';
import gsap from "gsap";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn, isLoading, Error, isOpen } = useSelector(
    (state) => state.AuthReducer
  );

  const [signIn, setsignIn] = useState({
    email: "",
    password: "",
  });

  const cardRef = useRef(null);
  const elementsRef = useRef([]);

  const handleChange = (e) => {
    setsignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignInThunk(signIn));
  };

  const GoogleSignIn = () => {
    dispatch(SignInPoPup());
  };

  useEffect(() => {
    dispatch(SignUpBackAct());
  }, []);

  useEffect(() => {
    if (isSignIn) {
      navigate("/");
    }
  }, [isSignIn]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(elementsRef.current.filter(Boolean), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.5");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f19] flex items-center justify-center px-6 overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

      {/* Error Snackbar */}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(isOpenAct(false))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(isOpenAct(false))}
          severity="error"
          className="bg-red-600 text-white rounded-xl shadow-lg border border-red-500"
        >
          {Error}
        </Alert>
      </Snackbar>

      {/* Form Card */}
      <div ref={cardRef} className="max-w-md w-full bg-[#101626]/50 border border-slate-800/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 space-y-6">
        
        <div ref={(el) => (elementsRef.current[0] = el)} className="text-center space-y-2">
          <h2 className="text-white text-3xl font-black tracking-tight">
            Welcome <span className="text-blue-500">Back</span>
          </h2>
          <p className="text-slate-400 text-sm">Sign in to unlock your custom cinematic experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div ref={(el) => (elementsRef.current[1] = el)}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={signIn.email}
              placeholder="Enter your email"
              className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
              onChange={handleChange}
            />
          </div>
          <div ref={(el) => (elementsRef.current[2] = el)}>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signIn.password}
              placeholder="Enter your password"
              className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
              onChange={handleChange}
            />
          </div>
          
          <div ref={(el) => (elementsRef.current[3] = el)} className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-600/25"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <div ref={(el) => (elementsRef.current[4] = el)} className="flex items-center justify-between text-xs text-slate-500 my-4">
          <div className="w-full h-px bg-slate-800"></div>
          <span className="px-3 uppercase tracking-widest text-[10px] font-bold">OR</span>
          <div className="w-full h-px bg-slate-800"></div>
        </div>

        <div ref={(el) => (elementsRef.current[5] = el)} className="flex justify-center">
          <button
            onClick={GoogleSignIn}
            className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-3 text-sm shadow-sm"
          >
            <GoogleIcon className="text-red-500 !text-lg" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div ref={(el) => (elementsRef.current[6] = el)} className="text-center pt-2 space-y-2 text-xs">
          <p className="text-slate-400">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up free
            </Link>
          </p>
          <p>
            <Link
              to={"/"}
              className="text-slate-500 hover:text-slate-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
