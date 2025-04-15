import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteItemThunk, getMoviesThunk, MenuNameAct } from "../services/actions/MovieAct";
import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import "../index.css";

const Catalog = () => {
    const { movies } = useSelector((state) => state.MovieReducer);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const [showLoader, setShowLoader] = useState(true); // loader control

    const DeleteItem = (id) => {
        dispatch(DeleteItemThunk(id));
    };

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        if (location.pathname === '/catalog') {
            handleName('Catalog');
        }
    }, [location.pathname]);

    useEffect(() => {
        dispatch(getMoviesThunk());

        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="catalog !h-[calc(100vh-8rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll scroll">
            <Container className="xl:!max-w-[1140px]">
                {showLoader ? (
                    <div className="flex justify-center items-center h-[75vh]">
                        <div className="loader-sm"></div>
                    </div>
                ) : (
                    <Row className="gap-y-7 !mb-20">
                        {movies.length === 0 ? (
                            <h2 className="text-center text-gray-400">No movies found</h2>
                        ) : (
                            movies.map((item) => (
                                <Col lg={4} key={item.id}>
                                    <div className="bg-[#474E68] text-white rounded-lg shadow-md p-4 flex flex-col justify-around h-full transition-transform transform hover:scale-105 hover:shadow-xl mt-8">
                                        <div className="overflow-hidden rounded-lg">
                                            <img src={item.coverImage} alt={item.title} className="aspect-[6/9] w-full rounded-lg" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2 hover:text-[#6B728E] transition-colors">{item.title}</h3>
                                            <p className="text-sm text-gray-300 hover:text-gray-100 transition-colors mb-3">{item.description}</p>
                                            <p className="text-sm mb-2 hover:text-[#6B728E] transition-colors flex items-center justify-between">
                                                <strong>Category:</strong> {item.itemType}
                                            </p>
                                            <p className="text-sm mb-2 hover:text-[#6B728E] transition-colors flex items-center justify-between">
                                                <strong>Release Year:</strong> {item.releaseYear}
                                            </p>
                                            <p className="text-sm mb-2 hover:text-[#6B728E] transition-colors flex items-center justify-between">
                                                <strong>Genre:</strong> {item.genre}
                                            </p>
                                            <p className="text-sm mb-2 hover:text-[#6B728E] transition-colors flex items-center justify-between">
                                                <strong>Country:</strong> {item.country}
                                            </p>
                                        </div>
                                        <div className="flex justify-between mt-3">
                                            <Button onClick={() => { navigate(`/edititem/${item.id}`); handleName("Edit Movie") }} className="!bg-[#50577A] hover:!bg-[#6B728E] text-white p-2 rounded-full transition-colors">
                                                <EditIcon />
                                            </Button>
                                            <Button onClick={() => DeleteItem(item.id)} className="!bg-[#e74c3c] hover:!bg-[#c0392b] text-white p-2 rounded-full transition-colors">
                                                <DeleteIcon />
                                            </Button>
                                            <Button className="!bg-[#6B728E] hover:!bg-[#50577A] text-white p-2 rounded-full transition-colors" onClick={() => navigate(`/singleviewmovie/${item.id}`)}>
                                                <RemoveRedEyeIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>
                )}
            </Container>
        </section>
    );
};

export default Catalog;
