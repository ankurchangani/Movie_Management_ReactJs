import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeNavigateThunk, loginAdminThunk } from "../services/actions/AuthAction";
import { useEffect, useRef } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Snackbar } from "@mui/material";
import { AddFavoriteThunk, getMoviesThunk, isOpenAct } from "../services/actions/MovieUserAct";
import { setSearchQueryAct } from "../services/actions/MovieUserAct";
import gsap from "gsap";

const Home = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const { movies, isCreated, isLoading, Error, isOpen, searchQuery } = useSelector(state => state.MovieReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const heroTitleRef = useRef(null);
    const heroMetaRef = useRef(null);
    const heroButtonsRef = useRef(null);
    const cardsRef = useRef([]);

    const FaviourteMovie = (movie) => {
        dispatch(AddFavoriteThunk(movie));
    };

    useEffect(() => {
        dispatch(HomeNavigateThunk());
        dispatch(loginAdminThunk());
        dispatch(getMoviesThunk());
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user]);

    useEffect(() => {
        if (isCreated) {
            navigate("/faviourtemovie");
        }
    }, [isCreated]);

    // Animations for Hero Section
    useEffect(() => {
        if (movies.length > 0) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(heroTitleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
              .fromTo(heroMetaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
              .fromTo(heroButtonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5");
        }
    }, [movies]);

    // Stagger animation for movie cards
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (filteredMovies.length > 0) {
            // reset card references length
            cardsRef.current = cardsRef.current.slice(0, filteredMovies.length);
            gsap.fromTo(
                cardsRef.current.filter(Boolean),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
            );
        }
    }, [filteredMovies, searchQuery]);

    // Pick first movie as featured banner, or default fallback
    const featuredMovie = movies[0] || {
        title: "Interstellar Adventure",
        coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
        genre: "Sci-Fi / Adventure",
        runningTime: 169,
        releaseYear: 2024,
        link: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    };

    return (
        <div className="bg-[#0b0f19] text-white min-h-screen pb-16">
            {/* Snackbar for errors */}
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error" className="bg-red-600 text-white font-medium rounded-xl shadow-lg border border-red-500">
                    {Error}
                </Alert>
            </Snackbar>

            {/* Featured Hero Banner */}
            <section className="relative h-[85vh] w-full flex items-end pb-20 px-6 md:px-16 overflow-hidden">
                {/* Background Image with Gradients */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={featuredMovie.coverImage} 
                        alt={featuredMovie.title} 
                        className="w-full h-full object-cover object-top scale-105 filter brightness-75 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/80 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-3xl space-y-6">
                    <span className="inline-block bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg">
                        Featured Cinema
                    </span>
                    <h1 ref={heroTitleRef} className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                        {featuredMovie.title}
                    </h1>
                    
                    <div ref={heroMetaRef} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
                        <span className="font-semibold text-blue-400">{featuredMovie.genre}</span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                        <span>{featuredMovie.releaseYear}</span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                        <span>{featuredMovie.runningTime} mins</span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                        <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold">8.5 IMDB</span>
                    </div>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed drop-shadow-sm line-clamp-3">
                        {featuredMovie.description || "Embark on an epic cinematic journey that pushes boundaries, seeks truth, and delivers breathtaking storytelling. Discover why this story captivates audiences worldwide."}
                    </p>

                    <div ref={heroButtonsRef} className="flex flex-wrap gap-4 pt-2">
                        <a 
                            href={featuredMovie.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                        >
                            <PlayCircleIcon className="!text-xl" />
                            <span>Watch Trailer</span>
                        </a>
                        <button 
                            onClick={() => FaviourteMovie(featuredMovie)}
                            className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] backdrop-blur"
                        >
                            <FavoriteIcon className="text-red-500 !text-xl" />
                            <span>Add to Favourites</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Search Bar Section */}
            <section className="relative z-20 -mt-10 px-6 max-w-7xl mx-auto">
                <div className="bg-[#101626]/80 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-2xl mx-auto flex items-center gap-4">
                    <SearchIcon className="text-slate-400 !text-2xl" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQueryAct(e.target.value))}
                        placeholder="Search movies by title..."
                        className="bg-transparent text-white placeholder-slate-500 w-full focus:outline-none text-base md:text-lg"
                    />
                </div>
            </section>

            {/* Movie List Section */}
            <section className="max-w-7xl mx-auto px-6 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Recommended Movies</h2>
                        <p className="text-slate-400 text-sm mt-1">Handpicked cinema experiences tailored for you</p>
                    </div>
                    <span className="text-slate-400 text-sm font-semibold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                        {filteredMovies.length} movies
                    </span>
                </div>

                {filteredMovies.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl">
                        <p className="text-slate-400 text-lg">No movies found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredMovies.map((movie, index) => (
                            <div 
                                key={movie.id}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="group relative bg-[#101626]/40 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Cover Image Container */}
                                <div className="relative aspect-[2/3] w-full overflow-hidden">
                                    <img 
                                        src={movie.coverImage} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out" 
                                    />
                                    
                                    {/* Glassmorphic Overlay on Hover */}
                                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 z-20">
                                        {/* Favorite Toggle Button */}
                                        <button 
                                            onClick={() => FaviourteMovie(movie)}
                                            className="self-end bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-white hover:text-red-500 p-2.5 rounded-xl backdrop-blur transition-all duration-300"
                                        >
                                            <FavoriteIcon className="!text-lg" />
                                        </button>

                                        {/* Play Action */}
                                        <a 
                                            href={movie.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="self-center bg-blue-600 text-white p-3.5 rounded-full hover:scale-110 shadow-lg shadow-blue-600/30 transition-all duration-300"
                                        >
                                            <PlayCircleIcon className="!text-3xl" />
                                        </a>

                                        {/* Rating display */}
                                        <div className="bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg backdrop-blur text-xs font-bold text-yellow-500 self-start">
                                            8.5 / 10
                                        </div>
                                    </div>
                                </div>

                                {/* Text Details Section */}
                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-slate-400 mt-3 border-t border-slate-800/60 pt-3">
                                        <span>{movie.genre}</span>
                                        <span>{movie.runningTime} min</span>
                                        <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-white font-medium">{movie.releaseYear}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
