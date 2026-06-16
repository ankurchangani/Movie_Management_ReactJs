import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isOpenAct, SignInThunk, SignUpBackAct } from "../services/actions/AuthAction";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import gsap from "gsap";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSignIn, isLoading, Error, isOpen } = useSelector(state => state.AuthReducer);

    const [signIn, setsignIn] = useState({
        email: "",
        password: "",
    })

    const cardRef = useGsap3DTilt({ maxRotation: 6, scale: 1.01 });
    const contentRef = useRef(null);

    const handleChange = (e) => {
        setsignIn({ ...signIn, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SignInThunk(signIn));
    }

    useEffect(() => {
        if (isSignIn || localStorage.getItem("uid")) {
            navigate("/")
        }
    }, [isSignIn, navigate])

    // Google Sign-In removed

    useEffect(() => {
        dispatch(SignUpBackAct())
    }, [dispatch])

    // GSAP staggered entrance animations
    useEffect(() => {
        if (contentRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".anim-field",
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
                );
            }, contentRef);
            return () => ctx.revert();
        }
    }, []);

    return (
        <>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error" className="glass-panel text-white">
                    {Error}
                </Alert>
            </Snackbar>
            
            <section className="flex justify-center items-center min-h-screen bg-[#08090d] relative overflow-hidden px-4">
                {/* Floating ambient glow blobs for 3D depth */}
                <div className="ambient-glow-1 top-10 left-10"></div>
                <div className="ambient-glow-2 bottom-10 right-10"></div>

                <Container className="relative z-10">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                            <div 
                                ref={cardRef}
                                className="w-full p-6 md:p-8 glass-card rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                            >
                                <div ref={contentRef} className="space-y-6">
                                    {/* Logo header */}
                                    <div className="text-center anim-field space-y-1">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 mx-auto mb-3">
                                            <LockOpenIcon className="text-white" />
                                        </div>
                                        <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                                            Sign In to <span className="text-indigo-400 font-bold">MovieMate</span>
                                        </h2>
                                        <p className="text-slate-400 text-xs">Enter credentials to unlock admin console</p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="anim-field">
                                            <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={signIn.email}
                                                placeholder="admin@moviemate.com"
                                                className="block w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="anim-field">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                                                    Password
                                                </label>
                                                <Link
                                                    to={"/forget-password"}
                                                    className="text-[11px] text-indigo-400 hover:text-indigo-300 no-underline transition"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={signIn.password}
                                                placeholder="••••••••"
                                                className="block w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="anim-field pt-2">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition duration-300 transform hover:scale-102 flex items-center justify-center text-sm"
                                            >
                                                {isLoading ? "Signing In..." : "Sign In"}
                                            </button>
                                        </div>
                                    </form>

                                    {/* Google sign-in option removed */}

                                    {/* Nav link footer */}
                                    <div className="anim-field text-center pt-2">
                                        <p className="text-xs text-slate-400 m-0">
                                            Don’t have an account?{" "}
                                            <Link
                                                to={"/signup"}
                                                className="text-indigo-400 hover:text-indigo-300 font-bold no-underline hover:underline transition"
                                            >
                                                Create account
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignIn;
