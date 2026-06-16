import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isOpenAct, ForgetPasswordThunk, ErrorAct } from "../services/actions/AuthAction";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import gsap from "gsap";

const ForgatePassword = () => {
    const dispatch = useDispatch();
    const { isLoading, Error, isOpen } = useSelector(state => state.AuthReducer);

    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const cardRef = useGsap3DTilt({ maxRotation: 6, scale: 1.01 });
    const contentRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        dispatch(
            ForgetPasswordThunk(
                email,
                () => {
                    setIsSuccess(true);
                    setSuccessMessage("Password reset email sent successfully. Please check your inbox!");
                },
                (err) => {
                    setIsSuccess(false);
                }
            )
        );
    };

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

    // Clear error on unmount
    useEffect(() => {
        return () => {
            dispatch(ErrorAct(null));
            dispatch(isOpenAct(false));
        };
    }, [dispatch]);

    return (
        <>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error" className="glass-panel text-white">
                    {Error}
                </Alert>
            </Snackbar>

            <Snackbar open={isSuccess} autoHideDuration={8000} onClose={() => setIsSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setIsSuccess(false)} severity="success" className="glass-panel text-white" sx={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                    {successMessage}
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
                                            <MailOutlineIcon className="text-white" />
                                        </div>
                                        <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                                            Reset Password
                                        </h2>
                                        <p className="text-slate-400 text-xs">Enter your email to receive a password reset link</p>
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
                                                value={email}
                                                placeholder="admin@moviemate.com"
                                                className="block w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="anim-field pt-2">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition duration-300 transform hover:scale-102 flex items-center justify-center text-sm"
                                            >
                                                {isLoading ? "Sending..." : "Send Reset Link"}
                                            </button>
                                        </div>
                                    </form>

                                    {/* Back to sign-in Link */}
                                    <div className="anim-field text-center pt-2 border-t border-white/10">
                                        <p className="text-xs text-slate-400 m-0">
                                            <Link
                                                to={"/signin"}
                                                className="text-slate-400 hover:text-white font-bold no-underline transition flex items-center justify-center gap-1.5"
                                            >
                                                <ArrowBackIcon fontSize="inherit" />
                                                <span>Back to Sign In</span>
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
    );
};

export default ForgatePassword;
