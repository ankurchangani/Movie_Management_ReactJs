import { Col, Container, Row, Spinner } from "react-bootstrap";
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuNameAct, SingleItemThunk } from "../services/actions/MovieAct";

const SingleMovie = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { movie } = useSelector(state => state.MovieReducer);

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        dispatch(SingleItemThunk(id));
    }, [id]);

    useEffect(() => {
        if (location.pathname === `/singleviewmovie/${id}`) {
            handleName('View Movie');
        }
    }, [location.pathname]);

    return (
        <section className="flex items-center justify-center min-h-screen overflow-y-auto bg-[#474E68] py-10">
            <Container>
                <Row>
                    <Col lg={12}>
                        {!movie ? (
                            <div className="text-center text-white">
                                <Spinner animation="border" variant="light" />
                                <p>Loading Movie...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center bg-[#474E68] shadow-2xl rounded-lg overflow-hidden">
                                <img src={movie.coverImage} alt={movie.title} className="w-screen max-h-[500px] object-cover" />
                                
                                <div className="w-full bg-[#50577A] p-6 flex flex-col justify-start items-start gap-4">
                                    <h1 className="text-[#6B728E] text-3xl md:text-4xl font-bold">{movie.title}</h1>

                                    <ul className="flex flex-wrap gap-4 text-white text-sm">
                                        <li><strong>Year:</strong> {movie.releaseYear}</li>
                                        <li><strong>Duration:</strong> {movie.runningTime} Min</li>
                                        <li><strong>Quality:</strong> {movie.quality}</li>
                                    </ul>

                                    <p className="text-white text-sm leading-6">
                                        {movie.description} <span className="text-[#6B728E] cursor-pointer">Read more...</span>
                                    </p>

                                    <a href={movie.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#6B728E] hover:bg-[#50577A] text-white px-6 py-2 rounded-md transition duration-300 text-center no-underline font-medium">
                                        WATCH MOVIE
                                    </a>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SingleMovie;
