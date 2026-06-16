import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMoviesThunk, LoginUserGateThunk, MenuNameAct } from "../services/actions/MovieAct";
import HomeBg from "../assets/images/HomeBg/movie-bg.jpg";
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import gsap from "gsap";

import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { admin } = useSelector((state) => state.AuthReducer);
    const { movies, users } = useSelector((state) => state.MovieReducer);

    // Local states for animated counts
    const [movieCount, setMovieCount] = useState(0);
    const [tvCount, setTvCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const cardsContainerRef = useRef(null);
    const chartPathRef = useRef(null);

    // 3D Tilt for Quick Action Cards
    const tiltCard1 = useGsap3DTilt({ maxRotation: 8, scale: 1.02 });
    const tiltCard2 = useGsap3DTilt({ maxRotation: 8, scale: 1.02 });
    const tiltCard3 = useGsap3DTilt({ maxRotation: 8, scale: 1.02 });

    useEffect(() => {
        dispatch(getMoviesThunk());
        dispatch(LoginUserGateThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!admin) {
            navigate('/signin');
        }
    }, [admin, navigate]);

    // Count-up animations for metrics
    useEffect(() => {
        if (movies && movies.length > 0) {
            const moviesTotal = movies.length;
            const tvTotal = movies.filter(m => m.itemType === 'tvshow').length;
            
            const movieCounter = { val: 0 };
            gsap.to(movieCounter, {
                val: moviesTotal,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => setMovieCount(Math.floor(movieCounter.val))
            });

            const tvCounter = { val: 0 };
            gsap.to(tvCounter, {
                val: tvTotal,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => setTvCount(Math.floor(tvCounter.val))
            });
        }
    }, [movies]);

    useEffect(() => {
        if (users && users.length > 0) {
            const userCounter = { val: 0 };
            gsap.to(userCounter, {
                val: users.length,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => setUserCount(Math.floor(userCounter.val))
            });
        }
    }, [users]);

    // Staggered entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".header-hero-content > *", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            gsap.from(".metric-card", {
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "back.out(1.2)",
                delay: 0.3
            });

            gsap.from(".action-card", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                delay: 0.6
            });

            // SVG Path dash offset drawing animation
            if (chartPathRef.current) {
                const pathLength = chartPathRef.current.getTotalLength();
                gsap.fromTo(chartPathRef.current,
                    { strokeDasharray: pathLength, strokeDashoffset: pathLength },
                    { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", delay: 0.5 }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const handleMenuName = (name) => {
        dispatch(MenuNameAct(name));
    };

    return (
        <section className="dashboard-home min-h-screen pb-16">
            <Container fluid className="px-0">
                {/* Cinema Hero Banner */}
                <div 
                    className="header-hero h-[300px] rounded-3xl relative overflow-hidden flex items-center p-8 md:p-12 mb-8 bg-cover bg-center border border-white/10 shadow-2xl"
                    style={{ backgroundImage: `url(${HomeBg})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-0"></div>
                    <div className="header-hero-content relative z-10 max-w-xl flex flex-col gap-3">
                        <span className="neon-badge-indigo inline-block w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Control Panel v1.0.0
                        </span>
                        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight text-neon-glow">
                            Welcome back, Admin
                        </h1>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                            Manage your library catalog, monitor active sessions, configure playback link routes, and view analytics in real-time.
                        </p>
                    </div>
                </div>

                {/* Dashboard Metric Grid */}
                <Row className="mb-8 gap-y-4">
                    <Col xs={12} sm={6} md={3}>
                        <div className="metric-card glass-card rounded-2xl p-5 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Movies</span>
                                <h2 className="text-3xl font-extrabold text-white m-0 text-neon-glow">{movieCount}</h2>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <MovieIcon className="text-indigo-400" />
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} md={3}>
                        <div className="metric-card glass-card rounded-2xl p-5 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">TV Shows</span>
                                <h2 className="text-3xl font-extrabold text-white m-0 text-neon-glow">{tvCount}</h2>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <TvIcon className="text-purple-400" />
                            </div>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                        <div className="metric-card glass-card rounded-2xl p-5 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Active Users</span>
                                <h2 className="text-3xl font-extrabold text-white m-0 text-neon-glow">{userCount}</h2>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <PeopleIcon className="text-cyan-400" />
                            </div>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={3}>
                        <div className="metric-card glass-card rounded-2xl p-5 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">System Health</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="relative flex h-3.5 w-3.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                                    </span>
                                    <h2 className="text-lg font-bold text-emerald-400 m-0">Optimal</h2>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <SpeedIcon className="text-emerald-400" />
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Dashboard Graphical Analytics & Recent Activities */}
                <Row className="mb-8 gap-y-6">
                    <Col lg={8}>
                        <div className="glass-card rounded-3xl p-6 h-full border border-white/10 flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-white text-lg font-bold">Catalog Activity Trend</h3>
                                    <span className="text-xs text-slate-400">Additions and uploads trends this month</span>
                                </div>
                                <span className="neon-badge-cyan text-xs px-2.5 py-1 rounded-full font-semibold">Live Monitor</span>
                            </div>
                            <div className="w-full h-[220px] relative">
                                <svg viewBox="0 0 500 200" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path 
                                        ref={chartPathRef}
                                        d="M 0 150 Q 80 130, 150 90 T 300 110 T 420 50 T 500 40" 
                                        fill="none" 
                                        stroke="#6366f1" 
                                        strokeWidth="4" 
                                        strokeLinecap="round"
                                    />
                                    <path 
                                        d="M 0 150 Q 80 130, 150 90 T 300 110 T 420 50 T 500 40 L 500 200 L 0 200 Z" 
                                        fill="url(#chart-grad)" 
                                    />
                                    {/* Grid Lines */}
                                    <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="glass-card rounded-3xl p-6 h-full border border-white/10 flex flex-col">
                            <h3 className="text-white text-lg font-bold mb-4">Quick Insights</h3>
                            <div className="flex-grow flex flex-col justify-around gap-4">
                                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition">
                                    <span className="text-sm text-slate-300">Format Ratio</span>
                                    <span className="text-xs font-bold text-indigo-400">16:9 Cinema HD</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition">
                                    <span className="text-sm text-slate-300">Quality Ratio</span>
                                    <span className="text-xs font-bold text-purple-400">95% Full HD</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition">
                                    <span className="text-sm text-slate-300">API Connection</span>
                                    <span className="text-xs font-bold text-emerald-400">Websockets Active</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Quick Actions Panel */}
                <h3 className="text-white text-lg font-bold mb-4">Quick Launch Actions</h3>
                <Row ref={cardsContainerRef} className="gap-y-4">
                    <Col md={4} className="action-card">
                        <div 
                            ref={tiltCard1}
                            onClick={() => { navigate("/additems"); handleMenuName("Add Movie"); }}
                            className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between cursor-pointer group hover:bg-indigo-600/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <AddIcon className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-white text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                                    Add New Item <ArrowForwardIcon fontSize="small" />
                                </h4>
                                <p className="text-slate-400 text-sm m-0">Publish new movies or TV shows to your database instantaneously.</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={4} className="action-card">
                        <div 
                            ref={tiltCard2}
                            onClick={() => { navigate("/catalog"); handleMenuName("Catalog"); }}
                            className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between cursor-pointer group hover:bg-purple-600/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PlayCircleOutlineIcon className="text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-white text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                                    Catalog Library <ArrowForwardIcon fontSize="small" />
                                </h4>
                                <p className="text-slate-400 text-sm m-0">Browse details, update existing media info, and manage titles.</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={4} className="action-card">
                        <div 
                            ref={tiltCard3}
                            onClick={() => { navigate("/users"); handleMenuName("Users"); }}
                            className="glass-card rounded-3xl p-6 h-full flex flex-col justify-between cursor-pointer group hover:bg-cyan-600/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PeopleIcon className="text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="text-white text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                    User Sessions <ArrowForwardIcon fontSize="small" />
                                </h4>
                                <p className="text-slate-400 text-sm m-0">Check administrator profiles, emails, and active permissions.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Home;
