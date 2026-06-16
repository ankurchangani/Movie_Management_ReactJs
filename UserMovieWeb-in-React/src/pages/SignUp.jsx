import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ErrorAct, isOpenAct, SignUpThunk } from "../services/actions/AuthAction";
import { Alert, Snackbar } from "@mui/material";
import gsap from "gsap";

const SignUp = () => {
    const { isLoading, isCreated, Error, isOpen } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUp, setsignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const cardRef = useRef(null);
    const elementsRef = useRef([]);

    const handleChange = (e) => {
        setsignUp({ ...signUp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUp.password !== signUp.confirmPassword) {
            dispatch(ErrorAct("Password and Confirm Password should be the same."));
            dispatch(isOpenAct(true));
            return;
        }
        dispatch(SignUpThunk(signUp));
    };

    useEffect(() => {
        if (isCreated) {
            navigate("/signin");
        }
    }, [isCreated]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
            .fromTo(elementsRef.current.filter(Boolean), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.5");
    }, []);

    return (
        <div className="relative min-h-screen bg-[#0b0f19] flex items-center justify-center px-6 overflow-hidden select-none">
            {/* Background glow effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

            {/* Error Snackbar */}
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error" className="bg-red-600 text-white rounded-xl shadow-lg border border-red-500">
                    {Error}
                </Alert>
            </Snackbar>

            {/* Form Card */}
            <div ref={cardRef} className="max-w-md w-full bg-[#101626]/50 border border-slate-800/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 space-y-6">

                <div ref={(el) => (elementsRef.current[0] = el)} className="text-center space-y-2">
                    <h2 className="text-white text-3xl font-black tracking-tight">
                        Create <span className="text-blue-500">Account</span>
                    </h2>
                    <p className="text-slate-400 text-sm">Join MovieMate for free and start tracking your cinema.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div ref={(el) => (elementsRef.current[1] = el)}>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={signUp.name}
                            placeholder="Enter your full name"
                            className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div ref={(el) => (elementsRef.current[2] = el)}>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signUp.email}
                            placeholder="Enter your email"
                            className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div ref={(el) => (elementsRef.current[3] = el)}>
                        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signUp.password}
                            placeholder="Enter password (min 6 chars)"
                            className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <div ref={(el) => (elementsRef.current[4] = el)}>
                        <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={signUp.confirmPassword}
                            placeholder="Confirm your password"
                            className="w-full bg-slate-950/80 text-white border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 text-sm"
                            onChange={handleChange}
                        />
                    </div>

                    <div ref={(el) => (elementsRef.current[5] = el)} className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-600/25"
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div ref={(el) => (elementsRef.current[6] = el)} className="text-center pt-2 text-xs">
                    <p className="text-slate-400">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-500 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
