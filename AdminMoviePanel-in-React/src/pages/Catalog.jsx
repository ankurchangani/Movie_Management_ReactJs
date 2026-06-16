import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteItemThunk, getMoviesThunk, MenuNameAct } from "../services/actions/MovieAct";
import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import gsap from "gsap";
import "../index.css";

// Individual Movie Card Component for independent 3D Tilt
const MovieCard = ({ item, onDelete, onEdit, onView }) => {
    const cardRef = useGsap3DTilt({ maxRotation: 8, scale: 1.02 });

    return (
        <div 
            ref={cardRef} 
            className="movie-card-element glass-card text-white rounded-3xl p-4 flex flex-col justify-between h-full border border-white/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group"
        >
            {/* Aspect Ratio Cover Container */}
            <div className="overflow-hidden rounded-2xl relative mb-4 aspect-[6/9]">
                <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    <span className="neon-badge-indigo text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {item.quality}
                    </span>
                    <span className="neon-badge-purple text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {item.itemType === 'movie' ? 'Movie' : 'TV Show'}
                    </span>
                </div>
            </div>

            {/* Info Section */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1 leading-snug group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2 h-8">
                        {item.description}
                    </p>
                </div>
                
                {/* Meta details list */}
                <div className="text-[11px] text-slate-300 border-t border-white/5 pt-3 mb-4 space-y-1.5">
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">Release Year</span>
                        <span className="font-semibold text-white">{item.releaseYear}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">Genre</span>
                        <span className="font-semibold text-indigo-300 truncate max-w-[120px]">{item.genre}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">Country</span>
                        <span className="font-semibold text-white">{item.country}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons Panel */}
            <div className="flex items-center gap-2 mt-auto border-t border-white/5 pt-3">
                <Button 
                    onClick={() => onEdit(item.id)} 
                    className="!min-w-0 !p-2 flex-grow !rounded-xl !bg-white/5 hover:!bg-indigo-600/20 hover:!text-indigo-400 !text-slate-300 !transition-all !border !border-white/5"
                >
                    <EditIcon fontSize="small" />
                </Button>
                <Button 
                    onClick={() => onView(item.id)}
                    className="!min-w-0 !p-2 flex-grow !rounded-xl !bg-white/5 hover:!bg-cyan-600/20 hover:!text-cyan-400 !text-slate-300 !transition-all !border !border-white/5"
                >
                    <RemoveRedEyeIcon fontSize="small" />
                </Button>
                <Button 
                    onClick={() => onDelete(item.id)} 
                    className="!min-w-0 !p-2 flex-grow !rounded-xl !bg-white/5 hover:!bg-rose-600/20 hover:!text-rose-400 !text-slate-300 !transition-all !border !border-white/5"
                >
                    <DeleteIcon fontSize="small" />
                </Button>
            </div>
        </div>
    );
};

const Catalog = () => {
    const { movies } = useSelector((state) => state.MovieReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(true);

    const DeleteItem = (id) => {
        dispatch(DeleteItemThunk(id));
    };

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        dispatch(getMoviesThunk());

        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1200); // Reduced delay for better UX

        return () => clearTimeout(timer);
    }, [dispatch]);

    // Card entrance staggered animation
    useEffect(() => {
        if (!showLoader && movies.length > 0) {
            gsap.fromTo(".movie-card-element", 
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
            );
        }
    }, [showLoader, movies]);

    const handleEdit = (id) => {
        navigate(`/edititem/${id}`);
        handleName("Edit Movie");
    };

    const handleView = (id) => {
        navigate(`/singleviewmovie/${id}`);
        handleName("View Movie");
    };

    return (
        <section className="catalog min-h-screen pb-20">
            <Container fluid className="px-0">
                {showLoader ? (
                    <div className="flex flex-col justify-center items-center h-[65vh] gap-4">
                        <div className="loader-sm"></div>
                        <p className="text-indigo-400/80 font-bold uppercase tracking-wider text-xs animate-pulse">Syncing catalog library...</p>
                    </div>
                ) : (
                    <>
                        {movies.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[55vh] text-center gap-4 border border-white/5 bg-white/5 rounded-3xl p-8 max-w-xl mx-auto">
                                <div className="w-16 h-16 rounded-full bg-slate-500/10 flex items-center justify-center border border-slate-500/20">
                                    <MovieFilterIcon className="text-slate-400" fontSize="large" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">No Titles Found</h2>
                                    <p className="text-slate-400 text-sm max-w-xs m-0">Your catalog is currently empty. Click "Add Item" to catalog your first movie or series.</p>
                                </div>
                                <Button 
                                    onClick={() => { navigate("/additems"); handleName("Add Movie") }}
                                    variant="contained"
                                    className="!rounded-xl !bg-indigo-600 hover:!bg-indigo-500 !text-white !font-semibold !px-5 !py-2 !mt-2 !shadow-lg !shadow-indigo-500/15"
                                >
                                    Add Movie
                                </Button>
                            </div>
                        ) : (
                            <Row className="gap-y-6">
                                {movies.map((item) => (
                                    <Col xs={12} sm={6} md={4} xl={3} key={item.id} className="flex stretch">
                                        <MovieCard 
                                            item={item} 
                                            onDelete={DeleteItem} 
                                            onEdit={handleEdit} 
                                            onView={handleView} 
                                        />
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

export default Catalog;
