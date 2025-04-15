import { Container } from "react-bootstrap";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMoviesThunk } from "../services/actions/MovieAct";
import HomeBg from "../assets/images/HomeBg/movie-bg.jpg";

const Home = () => {
    const dispatch = useDispatch();

    const { admin } = useSelector((state) => state.AuthReducer);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getMoviesThunk());
    }, []);

    useEffect(() => {
        if (!admin) {
            navigate('/signin');
        }
    }, [admin]);


    return (
        <section
            className="h-[80vh] bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${HomeBg})` }}
        >
            <div className="absolute inset-0 bg-[##6B728E] opacity-50 z-0"></div>
            <Container className="relative z-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold">
                    Welcome to Movie Admin Panel
                </h1>
            </Container>
        </section>
    );
};

export default Home;
