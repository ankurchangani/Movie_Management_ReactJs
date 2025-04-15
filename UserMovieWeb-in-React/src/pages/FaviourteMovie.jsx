import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { DeleteFavoriteItemThunk, getFavoriteMovies } from "../services/actions/MovieUserAct";
import { Button } from "@mui/material";
import { loginAdminThunk } from "../services/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteLoader from "../assets/images/loader/favoriteGet.gif"

const FaviourteMovie = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favoriteMovies, isLoading } = useSelector((state) => state.MovieReducer);
    const { user } = useSelector(state => state.AuthReducer);
    console.log("get Favorite Movies", favoriteMovies);

    const DeleteFavorite = (id) => {
        dispatch(DeleteFavoriteItemThunk(id));
    }

    useEffect(() => {
        dispatch(getFavoriteMovies());
    }, [])

    useEffect(() => {
        dispatch(loginAdminThunk());
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user])

    return (
        <>
            <Header />
            <section className="pt-32 pb-5">
                <Container>
                    <Row className="gap-y-6">
                        {isLoading ? <div className="flex justify-center items-center overflow-hidden"> <img src={FavoriteLoader} alt="Loading" className="!w-[30%]" /></div> :

                            favoriteMovies.length === 0 ? <h2 className="text-center text-gray-400">No Favorite movies found</h2> :

                                favoriteMovies.map((movie, index) => {
                                    return (
                                        <Col lg={3} xs={12} md={4} key={movie.id}>
                                            <div className="main-part shadow-lg rounded-lg">
                                                <div className="relative group overflow-hidden rounded-lg !z-30">
                                                    <div className="w-full h-full relative">
                                                        <img src={movie.coverImage} alt="Movie Banner" className="aspect-[6/9] w-full h-full transform group-hover:scale-105  transition duration-300" />

                                                        {/* Play Button on Hover */}
                                                        <div className="absolute !z-40 inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 pointer-events-none">
                                                            <Button className="bg-black opacity-75 p-2 !rounded-full pointer-events-auto cursor-pointer !min-w-0">
                                                                <a href={movie.link} target="_blank">
                                                                    <PlayCircleIcon className="text-white !text-2xl" />
                                                                </a>
                                                            </Button>
                                                        </div>

                                                        {/* Favorite and Rating Icons */}
                                                        <div className="absolute inset-0 !z-30 flex flex-col justify-between p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300">
                                                            {/* Rating - Bottom Left */}
                                                            <div className="bg-black absolute bottom-1 left-1 opacity-75 text-white px-3 py-1 rounded-md pointer-events-auto text-center">
                                                                <span className="text-sm font-medium inline-block">8.5/10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="delete text-center mt-3 pb-3">
                                                    <Button className="bg-black opacity-100 p-2 !rounded-lg pointer-events-auto cursor-pointer !min-w-0 !text-red-800" onClick={() => DeleteFavorite(movie.id)}>Delete</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                        }
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default FaviourteMovie