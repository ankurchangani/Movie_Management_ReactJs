import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserGateThunk, MenuNameAct } from "../services/actions/MovieAct";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import UserIcon from "../assets/images/loadingIcon/users.gif";
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
import gsap from "gsap";

const UserCard = ({ user }) => {
    const cardRef = useGsap3DTilt({ maxRotation: 6, scale: 1.02 });

    return (
        <div
            ref={cardRef}
            className="user-card-element glass-card p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group h-full justify-between"
        >
            {/* Top Glow decoration */}
            <div className="absolute top-[-40px] right-[-40px] w-20 h-20 rounded-full bg-indigo-500/10 blur-xl pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>

            <div className="flex flex-col items-center gap-3">
                {/* Avatar container with neon gradient glow ring */}
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#08090d] bg-slate-800">
                        <img
                            src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                            alt={user.displayName || "User"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg leading-tight tracking-tight group-hover:text-indigo-400 transition-colors">
                        {user.displayName || "Anonymous Admin"}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                        <EmailIcon fontSize="inherit" className="text-slate-500" />
                        <span className="truncate max-w-[200px]">{user.email || "No email registered"}</span>
                    </div>
                </div>
            </div>

            {/* Badge role */}
            <div className="w-full border-t border-white/5 pt-4 mt-2">
                <span className="neon-badge-indigo inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">
                    <AdminPanelSettingsIcon fontSize="inherit" />
                    <span>Administrator</span>
                </span>
            </div>
        </div>
    );
};

const GetUsers = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { users, isLoading } = useSelector(state => state.MovieReducer);
    const gridRef = useRef(null);

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        handleName('Users');
    }, [dispatch]);

    useEffect(() => {
        dispatch(LoginUserGateThunk());
    }, [dispatch]);

    // Staggered entrance animation for user cards
    useEffect(() => {
        if (!isLoading && users.length > 0) {
            gsap.fromTo(".user-card-element",
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
            );
        }
    }, [isLoading, users]);

    return (
        <section className="py-4 min-h-[85vh]">
            <Container fluid className="px-0">
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-[65vh] gap-4">
                        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col items-center gap-3">
                            <img src={UserIcon} alt="Loading" className="w-24 h-24 object-contain rounded-2xl opacity-75" />
                            <p className="text-indigo-400/80 font-bold uppercase tracking-wider text-xs animate-pulse">Syncing user profiles...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {users.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[55vh] text-center gap-3 border border-white/5 bg-white/5 rounded-3xl p-8 max-w-xl mx-auto">
                                <h2 className="text-xl font-bold text-white mb-2">No Accounts Found</h2>
                                <p className="text-slate-400 text-sm max-w-xs m-0">No active administrator profiles registered under this tenant.</p>
                            </div>
                        ) : (
                            <Row ref={gridRef} className="gap-y-6">
                                {users.map((user) => (
                                    <Col xs={12} sm={6} md={4} xl={3} key={user.uid} className="flex stretch">
                                        <UserCard user={user} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
};

export default GetUsers;