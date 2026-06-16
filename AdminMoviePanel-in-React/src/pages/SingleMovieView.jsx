import { Col, Container, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuNameAct, SingleItemThunk } from "../services/actions/MovieAct";
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import PublicIcon from '@mui/icons-material/Public';
import gsap from "gsap";

const SingleMovie = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { movie } = useSelector(state => state.MovieReducer);
    const containerRef = useRef(null);

    // 3D tilt for details page cover poster
    const posterRef = useGsap3DTilt({ maxRotation: 10, scale: 1.04 });

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        dispatch(SingleItemThunk(id));
    }, [id, dispatch]);

    useEffect(() => {
        handleName('View Movie');
    }, [dispatch]);

    // Staggered entrance animation for page contents
    useEffect(() => {
        if (movie && containerRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".anim-fade-up",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                );

                gsap.fromTo(".anim-scale-in",
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.2)" }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [movie]);

    return (
        <section ref={containerRef} className="single-movie-view min-h-[90vh] py-6 relative overflow-hidden">
            {!movie ? (
                <div className="flex flex-col justify-center items-center h-[65vh] gap-3">
                    <Spinner animation="border" variant="indigo" style={{ color: '#6366f1' }} />
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-xs animate-pulse">Retreiving details...</p>
                </div>
            ) : (
                <>
                    {/* Cinema Backdrop Vignette */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 pointer-events-none z-0 scale-110"
                        style={{ backgroundImage: `url(${movie.coverImage})` }}
                    />
                    
                    <Container className="relative z-10">
                        {/* Go Back Link */}
                        <div className="mb-6 anim-fade-up">
                            <Link 
                                to="/catalog" 
                                onClick={() => handleName('Catalog')}
                                className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold no-underline text-sm transition"
                            >
                                <ArrowBackIcon fontSize="small" /> Back to Catalog
                            </Link>
                        </div>

                        <Row className="gap-y-8 items-center lg:items-start">
                            {/* Left Cover Poster */}
                            <Col md={5} lg={4} className="anim-scale-in flex justify-center">
                                <div 
                                    ref={posterRef}
                                    className="w-full max-w-[320px] aspect-[2/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group"
                                >
                                    <img 
                                        src={movie.coverImage} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                    {/* Reflection overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-30 pointer-events-none" />
                                </div>
                            </Col>

                            {/* Right Movie Details */}
                            <Col md={7} lg={8} className="space-y-6">
                                <div className="anim-fade-up space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="neon-badge-indigo text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                                            {movie.itemType === 'movie' ? 'Movie' : 'TV Show'}
                                        </span>
                                        <span className="neon-badge-cyan text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                                            {movie.quality}
                                        </span>
                                    </div>
                                    <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight text-neon-glow">
                                        {movie.title}
                                    </h1>
                                </div>

                                {/* Metadata Chips list */}
                                <div className="anim-fade-up flex flex-wrap gap-3 pt-2">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold text-slate-300">
                                        <CalendarTodayIcon className="text-indigo-400" fontSize="small" />
                                        <span>{movie.releaseYear}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold text-slate-300">
                                        <AccessTimeIcon className="text-purple-400" fontSize="small" />
                                        <span>{movie.runningTime} min</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold text-indigo-300">
                                        <MovieIcon className="text-indigo-400" fontSize="small" />
                                        <span>{movie.genre}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-2xl text-xs font-semibold text-slate-300">
                                        <PublicIcon className="text-cyan-400" fontSize="small" />
                                        <span>{movie.country}</span>
                                    </div>
                                </div>

                                {/* Synopsis */}
                                <div className="anim-fade-up space-y-3">
                                    <h3 className="text-white text-lg font-bold">Synopsis</h3>
                                    <div className="glass-card p-5 rounded-2xl border border-white/10 text-slate-300 text-sm leading-relaxed">
                                        {movie.description}
                                    </div>
                                </div>

                                {/* CTA Action button */}
                                <div className="anim-fade-up pt-4">
                                    <a 
                                        href={movie.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-3.5 rounded-2xl transition duration-300 text-center no-underline shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 transform hover:scale-102"
                                    >
                                        <PlayArrowIcon /> WATCH TRAILER
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </section>
    );
};

export default SingleMovie;
