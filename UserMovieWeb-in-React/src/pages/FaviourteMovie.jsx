import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DeleteFavoriteItemThunk, getFavoriteMovies } from "../services/actions/MovieUserAct";
import { loginAdminThunk } from "../services/actions/AuthAction";
import { useNavigate, Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteLoader from "../assets/images/loader/favoriteGet.gif"
import gsap from "gsap";

const FaviourteMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favoriteMovies, isLoading } = useSelector((state) => state.MovieReducer);
    const { user } = useSelector(state => state.AuthReducer);

    const cardsRef = useRef([]);
    const gridRef = useRef(null);
    const cardElementsRef = useRef({});

    const DeleteFavorite = (id) => {
        const cardEl = cardElementsRef.current[id];
        if (cardEl) {
            gsap.to(cardEl, {
                scale: 0.8,
                opacity: 0,
                y: 30,
                duration: 0.5,
                ease: "power3.inOut",
                onComplete: () => {
                    dispatch(DeleteFavoriteItemThunk(id));
                }
            });
        } else {
            dispatch(DeleteFavoriteItemThunk(id));
        }
    }

    useEffect(() => {
        dispatch(getFavoriteMovies());
        dispatch(loginAdminThunk());
    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user])

    // GSAP Stagger Entrance for Favorites
    useEffect(() => {
        if (favoriteMovies.length > 0) {
            const elements = Object.values(cardElementsRef.current).filter(Boolean);
            gsap.fromTo(elements,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
            );
        }
    }, [favoriteMovies]);

    return (
        <div className="bg-[#0b0f19] text-white min-h-screen pb-16 pt-36 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white">My Favourites</h1>
                        <p className="text-slate-400 text-sm mt-1">Your curated collection of films & TV shows</p>
                    </div>
                    <Link 
                        to="/" 
                        className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-sm hover:scale-[1.02]"
                    >
                        Browse More
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex flex-col gap-4 justify-center items-center py-20">
                        <img src={FavoriteLoader} alt="Loading" className="w-[120px] rounded-2xl filter brightness-90 shadow-2xl" />
                        <p className="text-slate-400 text-sm animate-pulse font-medium">Fetching your list...</p>
                    </div>
                ) : favoriteMovies.length === 0 ? (
                    <div className="text-center py-24 bg-slate-900/10 border border-dashed border-slate-800/80 rounded-2xl space-y-4">
                        <p className="text-slate-400 text-lg">No favorite movies found in your list.</p>
                        <Link 
                            to="/" 
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-600/25"
                        >
                            Explore Movies
                        </Link>
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {favoriteMovies.map((movie, index) => (
                            <div 
                                key={movie.id}
                                ref={(el) => (cardElementsRef.current[movie.id] = el)}
                                className="group relative bg-[#101626]/40 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Cover Image Container */}
                                <div className="relative aspect-[2/3] w-full overflow-hidden">
                                    <img 
                                        src={movie.coverImage} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out" 
                                    />
                                    
                                    {/* Glassmorphic Hover Overlay */}
                                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 z-20">
                                        {/* Play Action */}
                                        <a 
                                            href={movie.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-3.5 rounded-full hover:scale-110 shadow-lg shadow-blue-600/30 transition-all duration-300"
                                        >
                                            <PlayCircleIcon className="!text-3xl" />
                                        </a>

                                        {/* Rating */}
                                        <div className="bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg backdrop-blur text-xs font-bold text-yellow-500 absolute bottom-4 left-4">
                                            8.5 / 10
                                        </div>
                                    </div>
                                </div>

                                {/* Movie Description Text */}
                                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                                        <span>{movie.genre}</span>
                                        <span>{movie.runningTime} min</span>
                                        <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-white font-medium">{movie.releaseYear}</span>
                                    </div>
                                    <button 
                                        onClick={() => DeleteFavorite(movie.id)}
                                        className="w-full py-2.5 bg-slate-900/60 hover:bg-red-600/90 text-red-500 hover:text-white border border-slate-800/80 hover:border-transparent flex items-center justify-center gap-2 rounded-xl transition-all duration-300 text-xs font-bold shadow-sm"
                                    >
                                        <DeleteIcon className="!text-sm" />
                                        <span>Remove from List</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FaviourteMovie;