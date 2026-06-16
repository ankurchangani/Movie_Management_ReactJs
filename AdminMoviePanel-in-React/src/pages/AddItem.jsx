import { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MovieAddThunk, MenuNameAct } from "../services/actions/MovieAct";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { Alert, Button, Snackbar } from "@mui/material";
import { ErrorAct, isOpenAct } from "../services/actions/AuthAction";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useGsap3DTilt } from "../hooks/useGsap3DTilt";
import gsap from "gsap";

const AddItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { Error, isOpen } = useSelector(state => state.AuthReducer);
    const { isCreated, isLoading } = useSelector((state) => state.MovieReducer);

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        releaseYear: "",
        runningTime: "",
        quality: "HD", // default HD
        country: "",
        genre: "",
        itemType: "movie", // default movie
        link: "",
        coverImage: ""
    });

    const formRef = useRef(null);
    const previewRef = useGsap3DTilt({ maxRotation: 12, scale: 1.05 });

    const handleChange = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    }

    const handleSelectType = (type) => {
        setFormInput({ ...formInput, itemType: type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["coverImage", "title", "description", "releaseYear", "runningTime", "quality", "country", "genre", "itemType", "link"];
        for (let field of requiredFields) {
            if (!formInput[field]) {
                dispatch(ErrorAct(`Please fill out the ${field} field`));
                dispatch(isOpenAct(true));
                return;
            }
        }
        dispatch(MovieAddThunk(formInput));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2097152) {
            dispatch(ErrorAct('File size must be less than 2MB'));
            dispatch(isOpenAct(true));
            return;
        }

        const reader = new FileReader();
        reader.onload = ({ target }) => {
            const img = new Image();
            img.src = target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const ratio = Math.min(800 / img.width, 600 / img.height, 1);

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                setFormInput((prev) => ({
                    ...prev,
                    coverImage: canvas.toDataURL('image/jpeg', 0.8),
                }));
            };
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setFormInput(prev => ({ ...prev, coverImage: "" }));
    };

    useEffect(() => {
        if (isCreated) {
            navigate("/catalog");
        }
    }, [isCreated, navigate]);

    // Staggered entrance animation for form components
    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current.querySelectorAll('.animate-field'),
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
            );
        }
    }, []);

    useEffect(() => {
        dispatch(MenuNameAct('Add Movie'));
    }, [dispatch]);

    return (
        <>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error" className="glass-panel text-white">
                    {Error}
                </Alert>
            </Snackbar>
            
            <section className="bg-transparent py-4 min-h-[85vh] flex justify-center items-center">
                <Container>
                    <form 
                        ref={formRef} 
                        onSubmit={handleSubmit} 
                        className="glass-card w-full max-w-4xl mx-auto p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Ambient glow decoration */}
                        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] rounded-full bg-indigo-500/10 blur-[50px] pointer-events-none"></div>

                        <Row className="gap-y-6">
                            {/* Left Cover Upload Column */}
                            <Col lg={5} className="animate-field flex flex-col justify-start">
                                <label className="block mb-3 text-slate-300 font-bold uppercase tracking-wider text-xs">Upload Cover Art</label>
                                
                                <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleImage} />
                                
                                {!formInput.coverImage ? (
                                    <label 
                                        htmlFor="file-upload" 
                                        className="cursor-pointer h-[320px] flex flex-col items-center justify-center border-2 border-dashed border-white/15 hover:border-indigo-500/50 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all duration-300 gap-3 group text-center px-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                            <CloudUploadIcon className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm block mb-1">Select File</span>
                                            <span className="text-[10px] text-slate-400 block">PNG, JPG up to 2MB</span>
                                        </div>
                                    </label>
                                ) : (
                                    <div 
                                        ref={previewRef}
                                        className="relative h-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
                                        onClick={() => document.getElementById('file-upload').click()}
                                    >
                                        <img 
                                            src={formInput.coverImage} 
                                            alt="Cover Preview" 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1.5 bg-indigo-600 rounded-lg text-white font-semibold text-xs shadow-lg">Change</span>
                                                <button 
                                                    onClick={removeImage}
                                                    className="p-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white shadow-lg transition"
                                                >
                                                    <DeleteForeverIcon fontSize="small" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Col>

                            {/* Right Info Fields Column */}
                            <Col lg={7} className="space-y-4">
                                <div className="animate-field">
                                    <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Movie Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        value={formInput.title} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                        placeholder="Enter catalog title" 
                                    />
                                </div>

                                <div className="animate-field">
                                    <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={formInput.description} 
                                        onChange={handleChange} 
                                        rows={3} 
                                        className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm custom-scrollbar" 
                                        placeholder="Brief synopsis..."
                                    ></textarea>
                                </div>

                                <Row className="gap-y-4">
                                    <Col xs={6} className="animate-field">
                                        <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Release Date</label>
                                        <input 
                                            type="text" 
                                            name="releaseYear" 
                                            value={formInput.releaseYear} 
                                            onChange={handleChange} 
                                            className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                            placeholder="dd-mm-yyyy" 
                                        />
                                    </Col>
                                    <Col xs={6} className="animate-field">
                                        <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Running Time</label>
                                        <input 
                                            type="text" 
                                            name="runningTime" 
                                            value={formInput.runningTime} 
                                            onChange={handleChange} 
                                            className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                            placeholder="minutes" 
                                        />
                                    </Col>
                                </Row>

                                <Row className="gap-y-4">
                                    <Col xs={6} className="animate-field">
                                        <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Quality</label>
                                        <div className="relative">
                                            <select 
                                                name="quality" 
                                                value={formInput.quality} 
                                                onChange={handleChange} 
                                                className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm appearance-none cursor-pointer"
                                            >
                                                <option value="HD" className="bg-[#1a1d29]">HD</option>
                                                <option value="Full HD" className="bg-[#1a1d29]">Full HD</option>
                                                <option value="4K Ultra HD" className="bg-[#1a1d29]">4K Ultra HD</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                        </div>
                                    </Col>
                                    
                                    <Col xs={6} className="animate-field">
                                        <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Country</label>
                                        <input 
                                            type="text" 
                                            name="country" 
                                            value={formInput.country} 
                                            onChange={handleChange} 
                                            className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                            placeholder="e.g. USA, UK" 
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Extra metadata fields below */}
                        <Row className="mt-4 gap-y-4">
                            <Col md={6} className="animate-field">
                                <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Genre</label>
                                <input 
                                    type="text" 
                                    name="genre" 
                                    value={formInput.genre} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                    placeholder="e.g. Action, Drama, Sci-Fi" 
                                />
                            </Col>

                            <Col md={6} className="animate-field">
                                <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-2">Item Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectType("movie")}
                                        className={`py-2 px-4 rounded-xl text-sm font-semibold transition border ${
                                            formInput.itemType === "movie" 
                                                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20" 
                                                : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/5"
                                        }`}
                                    >
                                        🎬 Movie
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectType("tvshow")}
                                        className={`py-2 px-4 rounded-xl text-sm font-semibold transition border ${
                                            formInput.itemType === "tvshow" 
                                                ? "bg-gradient-to-r from-purple-600 to-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/20" 
                                                : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/5"
                                        }`}
                                    >
                                        📺 TV Show
                                    </button>
                                </div>
                            </Col>

                            <Col md={12} className="animate-field">
                                <label className="text-slate-300 font-bold uppercase tracking-wider text-xs block mb-1.5">Stream Playback Link</label>
                                <input 
                                    type="text" 
                                    name="link" 
                                    value={formInput.link} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 rounded-xl glow-input text-white text-sm" 
                                    placeholder="https://player.vimeo.com/video/..." 
                                />
                            </Col>
                        </Row>

                        {/* Submit Button Panel */}
                        <div className="mt-8 animate-field flex justify-end">
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="!rounded-xl !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !text-white !font-bold !px-8 !py-3 !shadow-lg !shadow-indigo-500/20 hover:!shadow-indigo-500/40 !transition-all !duration-300 !transform hover:!scale-102 flex items-center justify-center min-w-[150px]"
                            >
                                {isLoading ? <CircularProgress size={20} className="text-white" /> : "Publish Title"}
                            </Button>
                        </div>
                    </form>
                </Container>
            </section>
        </>
    );
};

export default AddItems;