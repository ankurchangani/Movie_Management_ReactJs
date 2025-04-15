import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MenuNameAct, SingleItemThunk, UpdateItemsThunk } from "../services/actions/MovieAct";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
import { CircularProgress } from '@mui/material';
import { ErrorAct, isOpenAct } from "../services/actions/AuthAction";

const EditItem = () => {

    const { isCreated, movie, isLoading } = useSelector((state) => state.MovieReducer);
    const { admin, Error, isOpen } = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        releaseYear: "",
        runningTime: "",
        quality: "",
        country: "",
        genre: "",
        itemType: "",
        link: "",
        coverImage: ""
    });

    const handleChange = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["coverImage", "title", "description", "releaseYear", "runningTime", "quality", "country", "genre", "itemType", "link"];
        for (let field of requiredFields) {
            if (!formInput[field]) return dispatch(ErrorAct(`Please fill out the ${field} field`)) && dispatch(isOpenAct(true));
        }
        dispatch(UpdateItemsThunk(formInput));
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file || file.size > 2097152) return alert('File size must be less than 2MB');

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

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        dispatch(SingleItemThunk(id))
    }, [id])

    useEffect(() => {
        if (movie) {
            setFormInput(movie)
        }
    }, [movie])

    useEffect(() => {
        if (isCreated) {
            navigate("/catalog");
        }
    }, [isCreated])

    useEffect(() => {
        if (!admin) {
            navigate('/signin')
        }
    }, [admin])

    useEffect(() => {
        if (location.pathname === `/edititem/${id}`) {
            handleName('Edit Movie');
        }
    }, [location.pathname]);

    return (
        <>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(isOpenAct(false))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => dispatch(isOpenAct(false))} severity="error">
                    {Error}
                </Alert>
            </Snackbar>
            <section className="bg-[#474E68] flex justify-center min-h-screen items-center bg-cover rounded-lg overflow-y-scroll">
                <Container>
                    <Row className="items-center mt-12 mb-10">
                        <form onSubmit={handleSubmit} className="bg-[#50577A] w-full max-w-4xl mx-auto p-8 rounded-xl shadow-lg">
                            <Col lg={12} className="flex flex-wrap justify-between gap-8">

                                {/* Cover Upload */}
                                <Col lg={5}>
                                    <label htmlFor="file-upload" className="block mb-2 text-white font-medium">Upload Cover</label>
                                    <label htmlFor="file-upload" className="cursor-pointer h-[300px] flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-[#6B728E] hover:bg-[#50577A] text-white transition">
                                        📁 Upload Cover
                                    </label>
                                    <input type="file" id="file-upload" className="hidden" onChange={handleImage} />
                                    <p className="mt-2 text-sm text-gray-300 text-center">PNG, JPG up to 2MB</p>
                                </Col>

                                {/* Input Fields */}
                                <Col lg={6}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-white">Title</label>
                                            <input type="text" name="title" value={formInput.title} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white placeholder-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter title" />
                                        </div>

                                        <div>
                                            <label className="text-white">Description</label>
                                            <textarea name="description" value={formInput.description} onChange={handleChange} rows={3} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white placeholder-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter description"></textarea>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <label className="text-white">Release Year</label>
                                                <input type="text" name="releaseYear" value={formInput.releaseYear} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white placeholder-[#e5e7eb]" placeholder="dd-mm-yyyy" />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="text-white">Running Time</label>
                                                <input type="text" name="runningTime" value={formInput.runningTime} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white placeholder-[#e5e7eb]" placeholder="min" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-white">Quality</label>
                                            <select name="quality" value={formInput.quality} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white">
                                                <option>HD</option>
                                                <option>Full HD</option>
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                            </Col>

                            <Col lg={12} className="mt-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-white">Country</label>
                                        <input type="text" name="country" value={formInput.country} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white" placeholder="Enter country" />
                                    </div>
                                    <div>
                                        <label className="text-white">Genre</label>
                                        <input type="text" name="genre" value={formInput.genre} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white" placeholder="Enter genre" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-white mb-2 block">Item Type</label>
                                    <div className="flex items-center gap-6">
                                        {["movie", "tvshow"].map(type => (
                                            <label key={type} className="flex items-center text-white cursor-pointer">
                                                <input type="radio" name="itemType" value={type} checked={formInput.itemType === type} onChange={handleChange} className="hidden peer" />
                                                <div className="w-5 h-5 mr-2 border-2 bg-[#6B728E] rounded-full peer-checked:bg-blue-400 peer-checked:border-white"></div>
                                                {type === "movie" ? "Movie" : "TV Show"}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-1/2">
                                        <label className="text-white">Upload Video</label>
                                        <label htmlFor="fileInput" className="block w-full mt-1 px-3 py-2 bg-[#6B728E] border border-gray-400 rounded text-white text-center cursor-pointer hover:bg-[#50577A]">Choose File</label>
                                        <input type="file" id="fileInput" className="hidden" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-white">Or Link</label>
                                        <input type="text" name="link" value={formInput.link} onChange={handleChange} className="w-full mt-1 px-3 py-2 rounded bg-[#6B728E] text-white" placeholder="https://" />
                                    </div>
                                </div>
                            </Col>

                            <div className="mt-6 text-right">
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                                    {isLoading ? <CircularProgress size={23} className="text-white" /> : "Update"}
                                </Button>
                            </div>
                        </form>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default EditItem;